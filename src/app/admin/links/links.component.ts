import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequestService } from '@app/core/http-request.service';
import { LINK } from '@app/core/url-constant';
import { LinksFormComponent } from './links-form/links-form.component';
import { SharedDataService } from '@app/core/shared-data.service';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
import { YES } from '@app/core/app-constant';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  constructor(private httpService: HttpRequestService, private modalService: NgbModal, private sharedDataService: SharedDataService) { }
  modalRef: NgbModalRef = null
  linksList = [];
  isLoading: Boolean = false;

  ngOnInit() {
    this.getAllLinks();
  }


  getAllLinks() {
    this.isLoading = true;
    this.httpService.get(LINK + 's').subscribe((resp: IResponse) => {
      this.linksList = resp.data;
      this.sharedDataService.addProjectNameField(this.linksList);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  }

  addLink() {
    this.modalRef = this.modalService.open(LinksFormComponent);
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then((data) => {
      this.getAllLinks();
    }, (reason) => {
    });
  }

  edit(link) {
    this.modalRef = this.modalService.open(LinksFormComponent);
    this.bindClose();
    this.modalRef.componentInstance.editLink(link);
  }

  delete(obj) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete bookmark`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${LINK}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.isLoading = false;
          this.getAllLinks();
        }, (err) => {
          this.isLoading = false;
        })
      }
      this.modalRef.close();
    })
  }

}
