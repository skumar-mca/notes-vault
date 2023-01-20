import { Component, OnInit } from '@angular/core';
import { YES } from '@app/core/app-constant';
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';
import { QUICKNOTE } from '@app/core/url-constant';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuickNotesFormComponent } from './quick-notes-form/quick-notes-form.component';

@Component({
  selector: 'app-quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.css']
})
export class QuickNotesComponent implements OnInit {

  constructor(private httpService: HttpRequestService, private modalService: NgbModal, private sharedDataService: SharedDataService) { }
  modalRef: NgbModalRef = null
  quickNotesList = [];
  isLoading: Boolean = false;

  ngOnInit() {
    this.getAllQuickNotes();
  }

  getAllQuickNotes() {
    this.isLoading = true;
    this.httpService.get(QUICKNOTE + 's').subscribe((resp: IResponse) => {
      this.quickNotesList = resp.data;
      this.sharedDataService.addProjectNameField(this.quickNotesList);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  }

  add() {
    this.modalRef = this.modalService.open(QuickNotesFormComponent, { size: 'lg', windowClass: 'modal-xxl', backdropClass: 'light-blue-backdrop' });
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then((data) => {
      this.getAllQuickNotes();
    }, (reason) => {
    });
  }

  edit(alloc) {
    this.modalRef = this.modalService.open(QuickNotesFormComponent, { size: 'lg', windowClass: 'modal-xxl', backdropClass: 'light-blue-backdrop' });
    this.bindClose();
    this.modalRef.componentInstance.edit(alloc);
  }

  delete(obj) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete quick note`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${QUICKNOTE}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.isLoading = false;
          this.getAllQuickNotes();
        }, (err) => {
          this.isLoading = false;
        })
      }
      this.modalRef.close();
    })
  }
}
