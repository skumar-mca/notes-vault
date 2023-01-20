import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from '@app/core/http-request.service'
import { PROJECT } from '@app/core/url-constant';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectFormComponent } from '@app/admin/projects/projects-modal/project-form/project-form.component'
import { SharedDataService } from '@app/core/shared-data.service';
import { YES } from '@app/core/app-constant';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-admin-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor(private httpService: HttpRequestService, private modalService: NgbModal, private sharedDataService: SharedDataService) { }
  modalRef: NgbModalRef = null
  projectsList = [];
  isLoading: Boolean = false;
  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.isLoading = true;
    this.httpService.get(PROJECT + 's').subscribe((resp: IResponse) => {
      this.projectsList = resp.data;
      this.sharedDataService.updateProjectList(this.projectsList);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  }

  addProject() {
    this.modalRef = this.modalService.open(ProjectFormComponent);
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then((data) => {
      this.getAllProjects();
    }, (reason) => {
    });
  }

  edit(proj) {
    this.modalRef = this.modalService.open(ProjectFormComponent);
    this.bindClose();
    this.modalRef.componentInstance.editProject(proj);

  }

  delete(obj) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete project`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${PROJECT}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.isLoading = false;
          this.getAllProjects();
        }, (err) => {
          this.isLoading = false;
        })
      }
      this.modalRef.close();
    })
  }
}
