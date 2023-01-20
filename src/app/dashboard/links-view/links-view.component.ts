import { Component, OnInit } from '@angular/core';
import { LinksFormComponent } from '@app/admin/links/links-form/links-form.component';
import { YES } from '@app/core/app-constant';
import { CommonService } from '@app/core/common-service.service';
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';
import { LINK } from '@app/core/url-constant';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as lodash from 'lodash';
@Component({
  selector: 'app-links-view',
  templateUrl: './links-view.component.html',
  styleUrls: ['./links-view.component.css']
})
export class LinksViewComponent implements OnInit {
  isLoading: boolean;
  linksList: any = [];
  isProjectSelected: Boolean = false;
  page = 1;
  pageSize = 20;
  cacheDuration = '';
  isListFromCache = false;
  modalRef: NgbModalRef = null
  isAdmin: any;
  allLinkKey = 'all-bookmarks';
  isEditMode: boolean = false;

  constructor(private httpService: HttpRequestService, private commonService: CommonService, private sharedDataService: SharedDataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.isAdmin = lodash.get(this.sharedDataService, 'userProfile.isAdmin', false);
    this.getAllLinks();
    this.sharedDataService.projectChangeSource.subscribe((flag) => {
      if (flag === YES) {
        this.getAllLinks();
      }
    })

    this.sharedDataService.editModeChangeSource.subscribe((flag) => {
      this.isEditMode = flag;
    });
  }

  updateListFromCache(listFromCache, timeStamp) {
    this.linksList = listFromCache;
    this.cacheDuration = timeStamp;
    this.updateListWithFavs();
    this.isListFromCache = true;
  }

  refreshList($event) {
    $event && $event.preventDefault();
    this.commonService.localStorageManager.remove(this.allLinkKey);
    this.getAllLinks(true);
  }

  getAllLinks(isIgnoreCache?) {
    let projectId = lodash.get(this.sharedDataService, 'selectedProject.projectAlias', 'all');
    const cacheKey = `${projectId}-bookmarks`;

    if (!isIgnoreCache) {
      let cachedLinkData = this.commonService.localStorageManager.load(this.allLinkKey, null);
      // Cache has all links, filter and return from here
      if (cachedLinkData && cachedLinkData.data.length > 0) {
        const cachedAllLinks = cachedLinkData.data;
        // Current request is for all links, therefore return without filtering
        if (this.allLinkKey === cacheKey) {
          this.updateListFromCache(cachedAllLinks, cachedLinkData.timeStamp);
          return;
        }

        let linksForSelectedProject = cachedAllLinks.filter((itm) => {
          return itm.projectId === projectId;
        });

        if (linksForSelectedProject.length > 0) {
          this.updateListFromCache(linksForSelectedProject, cachedLinkData.timeStamp);
          return;
        }
      }

      let cachedLinks = this.commonService.localStorageManager.load(cacheKey, null);
      if (cachedLinks) {
        this.updateListFromCache(cachedLinks.data, cachedLinks.timeStamp)
        this.linksList = cachedLinks.data;
        this.updateListWithFavs();
        return;
      }
    }

    this.isProjectSelected = this.sharedDataService.selectedProject != null;
    this.isListFromCache = false;

    this.isLoading = true;
    this.httpService.get(LINK + 's').subscribe((resp: IResponse) => {
      this.isLoading = false;
      this.linksList = resp.data;
      this.sharedDataService.addProjectNameField(this.linksList);
      this.updateListWithFavs();
      if (this.linksList && this.linksList.length > 0) {
        this.commonService.localStorageManager.save(cacheKey, this.linksList);
      }

    }, (err) => {
      this.isLoading = false;
    })
  }

  add($event) {
    $event && $event.preventDefault();
    this.modalRef = this.modalService.open(LinksFormComponent, { size: 'lg', windowClass: 'modal-xxl', backdropClass: 'light-blue-backdrop' });
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then((data) => {
      this.getAllLinks(data);
    }, (reason) => {
    });
  }

  edit($event, obj) {
    $event && $event.preventDefault();
    this.modalRef = this.modalService.open(LinksFormComponent, { size: 'lg', windowClass: 'modal-xxl', backdropClass: 'light-blue-backdrop' });
    this.bindClose();
    this.modalRef.componentInstance.editLink(obj);
  }

  delete($event, obj) {
    $event && $event.preventDefault();
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete bookmark`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${LINK}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.getAllLinks(true);
        }, (err) => {
        })
      }
      this.modalRef.close();
    })
  }

  loadRecentFromCache() {
    let cacheData = this.commonService.localStorageManager.load('recent-links', null);
    if (cacheData) {
      return cacheData.data;
    }
    return [];
  }

  updateListWithFavs() {
    let recentLinkList = this.loadRecentFromCache();
    this.linksList.forEach(itm => {
      itm.isFav = recentLinkList.findIndex((fav) => { return itm._id === fav._id; }) > -1;
    });
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
    
    this.commonService.localStorageManager.save('recent-links', recentLinkList);
  }
}
