import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '@app/core/http-request.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ALLOCATION, SONARRULES } from '@app/core/url-constant';
import { AllocationsFormComponent } from './allocations-form/allocations-form.component';
import { SharedDataService } from '@app/core/shared-data.service';
import { YES } from '@app/core/app-constant';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.css']
})
export class AllocationsComponent implements OnInit {

  constructor(private httpService: HttpRequestService, private modalService: NgbModal, private sharedDataService: SharedDataService) { }
  modalRef: NgbModalRef = null
  allocationsList = [];
  isLoading: Boolean = false;

  ngOnInit() {
    this.getAllAllocations();
  }

  getAllAllocations() {
    this.isLoading = true;
    this.httpService.get(ALLOCATION + 's').subscribe((resp: IResponse) => {
      this.allocationsList = resp.data;
      this.sharedDataService.addProjectNameField(this.allocationsList);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  }

  addAllocation() {
    this.modalRef = this.modalService.open(AllocationsFormComponent);
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then((data) => {
      this.getAllAllocations();
    }, (reason) => {
    });
  }

  edit(alloc) {
    this.modalRef = this.modalService.open(AllocationsFormComponent);
    this.bindClose();
    this.modalRef.componentInstance.editAllocation(alloc);
  }

  delete(obj) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete allocation`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${ALLOCATION}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.isLoading = false;
          this.getAllAllocations();
        }, (err) => {
          this.isLoading = false;
        })
      }
      this.modalRef.close();
    })
  }

  importJSRules() {

    this.httpService.get(SONARRULES).subscribe((resp: any) => {
      this.updateRule(resp.data, 0);
    })

    //this.saveRule(AllRules, 0);
  }

  updateRule(AllRules, index) {
    if (index >= AllRules.length) {
      alert('All Updated');
      return;
    }

    this.httpService.post(SONARRULES, { 'description': '1' }).subscribe((resp) => {
      //this.saveRule(AllRules, index + 1);
      alert('saved in db')
    });
  }

  saveRule(AllRules, index) {
    if (index >= AllRules.length) {
      alert('All Immported');
      return;
    }
    this.httpService.post(SONARRULES, AllRules.rules[index]).subscribe((resp) => {
      this.saveRule(AllRules, index + 1);
    })
  }

}
