import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '@app/core/http-request.service'
import { TECHNOLOGIES, TECHNOLOGY } from '@app/core/url-constant';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TechnologyFormComponent } from './technology-form/technology-form.component';
import { YES } from '@app/core/app-constant';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {

  constructor(private httpService: HttpRequestService, private modalService: NgbModal) { }
  modalRef: NgbModalRef = null
  technologyList = [];
  isLoading: Boolean = false;

  ngOnInit() {
    this.getAllTechnologies();
  }

  getAllTechnologies() {
    this.isLoading = true;
    this.httpService.get(TECHNOLOGIES).subscribe((resp: IResponse) => {
      this.technologyList = resp.data;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  }

  addTechnology() {
    this.modalRef = this.modalService.open(TechnologyFormComponent);
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then((data) => {
      this.getAllTechnologies();
    }, (reason) => {
    });
  }

  edit(tech) {
    this.modalRef = this.modalService.open(TechnologyFormComponent);
    this.bindClose();
    this.modalRef.componentInstance.editTechnology(tech);

  }

  delete(obj) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete technology`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${TECHNOLOGY}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.isLoading = false;
          this.getAllTechnologies();
        }, (err) => {
          this.isLoading = false;
        })
      }
      this.modalRef.close();
    })
  }
}
