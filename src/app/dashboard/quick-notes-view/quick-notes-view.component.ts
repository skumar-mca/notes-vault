import { Component, OnInit, ViewChild } from '@angular/core';
import { QuickNotesFormComponent } from '@app/admin/quick-notes/quick-notes-form/quick-notes-form.component';
import { YES } from '@app/core/app-constant';
import { CommonService } from '@app/core/common-service.service';
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';
import { QUICKNOTE } from '@app/core/url-constant';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as lodash from 'lodash';

@Component({
  selector: 'app-quick-notes-view',
  templateUrl: './quick-notes-view.component.html',
  styleUrls: ['./quick-notes-view.component.css']
})
export class QuickNotesViewComponent implements OnInit {

  constructor(private httpService: HttpRequestService, private sharedDataService: SharedDataService, private commonService: CommonService, private modalService: NgbModal) { }
  @ViewChild(QuickNotesFormComponent) quickNotesForm: QuickNotesFormComponent;

  isAdmin: any;
  isEditMode: any = false;
  showEditor: boolean = false;
  quickNotesList = [];
  isLoading: Boolean = false;
  noProjectSelected: Boolean = false;
  page = 1;
  pageSize = 20;
  modalRef: NgbModalRef = null;
  selectedNote = null
  allNotesKey = 'all-notes';
  cacheDuration = '';
  isListFromCache = false;
  isshowDetail = false;

  ngOnInit() {
    this.isAdmin = lodash.get(this.sharedDataService, 'userProfile.isAdmin', false);
    // this.showEditor = true;
    this.noProjectSelected = this.sharedDataService.selectedProject === null;

    this.sharedDataService.projectChangeSource.subscribe((flag) => {
      if (flag === YES) {
        this.getAllQuickNotes();
        this.noProjectSelected = this.sharedDataService.selectedProject === null;
      }
    });

    this.sharedDataService.editModeChangeSource.subscribe((flag) => {
      this.isEditMode = flag;
    });

    this.getAllQuickNotes();
  }

  updateListFromCache(listFromCache, timeStamp) {
    this.isListFromCache = true;
    this.cacheDuration = timeStamp;
    this.displayResult(listFromCache);
  }

  refreshList($event) {
    $event && $event.preventDefault();
    this.commonService.localStorageManager.remove(this.allNotesKey);
    this.getAllQuickNotes(true);
  }

  getAllQuickNotes(isIgnoreCache?) {
    this.quickNotesForm && this.quickNotesForm.addNew();
    let projectId = lodash.get(this.sharedDataService, 'selectedProject.projectAlias', 'all');
    const cacheKey = `${projectId}-notes`;

    if (!isIgnoreCache) {
      let cachedNotesData = this.commonService.localStorageManager.load(this.allNotesKey, null);
      // Cache has all notes, filter and return from here
      if (cachedNotesData) {
        const cachedAllNotes = cachedNotesData.data;
        // Current request is for all notes, therefore return without filtering
        if (this.allNotesKey === cacheKey) {
          this.updateListFromCache(cachedAllNotes, cachedNotesData.timeStamp);
          return;
        }

        let linksForSelectedProject = cachedAllNotes.filter((itm) => {
          return itm.projectId === projectId;
        });

        if (linksForSelectedProject.length > 0) {
          this.updateListFromCache(linksForSelectedProject, cachedNotesData.timeStamp);
          return;
        }
      }

      let cachedNotes = this.commonService.localStorageManager.load(cacheKey, null);
      if (cachedNotes) {
        this.updateListFromCache(cachedNotes.data, cachedNotes.timeStamp)
        return;
      }
    }

    if (this.isLoading) {
      return;
    }

    this.isListFromCache = false;
    this.selectedNote = null;
    this.isLoading = true;
    this.httpService.get(QUICKNOTE + 's').subscribe((resp: IResponse) => {
      this.isLoading = false;
      this.sharedDataService.addProjectNameField(resp.data);
      this.commonService.localStorageManager.save(cacheKey, resp.data);
      this.displayResult(resp.data);
    }, (err) => {
      this.isLoading = false;
    })
  }

  displayResult(list) {
    this.quickNotesList = list;
    this.updateListWithFavs();
    this.sortList();
    if (this.quickNotesList.length > 0) {
      setTimeout(() => {
        this.getDetails(this.quickNotesList[0])
      }, 100);
    }
  }

  onItemSave($vent) {
    if ($vent) {
      this.getAllQuickNotes(true);
    }
  }

  getDetails(obj) {
    this.selectedNote = obj;
    this.quickNotesForm && this.quickNotesForm.edit(obj, false);
  }

  add($event) {
    this.showEditor = true;
    $event && $event.preventDefault();
    this.selectedNote = null;
    this.quickNotesForm.addNew();
  }

  edit($event, obj) {
    this.showEditor = true;
    $event && $event.preventDefault();
    this.selectedNote = obj;
    this.quickNotesForm.edit(obj, true);
  }

  delete($event, obj) {
    $event && $event.preventDefault();
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete quick note`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${QUICKNOTE}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.getAllQuickNotes(true);
        }, (err) => {
        })
      }
      this.modalRef.close();
    })
  }

  noop($event) {
    $event && $event.preventDefault();
  }

  updateListWithFavs() {
    let recentLinkList = this.loadRecentFromCache();
    this.quickNotesList.forEach(itm => {
      itm.isFav = recentLinkList.findIndex((fav) => { return itm._id === fav._id; }) > -1;
    });
  }

  loadRecentFromCache() {
    let cacheData = this.commonService.localStorageManager.load('fav-notes', null);
    if (cacheData) {
      return cacheData.data;
    }
    return [];
  }

  saveInRecentList(link, flag) {
    link.isFav = flag;
    let recentLinkList = this.loadRecentFromCache();

    if (flag) {
      const alreadyExistInList = recentLinkList.filter((itm) => {
        return itm._id === link._id;
      });

      if (alreadyExistInList.length === 0) {
        recentLinkList.push(link);
      }
    }
    else {
      const index = recentLinkList.findIndex((itm) => {
        return itm._id === link._id;
      });

      recentLinkList.splice(index, 1);
    }

    this.commonService.localStorageManager.save('fav-notes', recentLinkList);
    this.sortList();

  }

  sortList() {
    this.quickNotesList = lodash.orderBy(this.quickNotesList, ['isFav'], ['desc']);
  }
}
