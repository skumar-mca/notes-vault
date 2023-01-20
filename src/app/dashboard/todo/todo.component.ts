import { Component, OnInit } from "@angular/core";
import { YES } from "@app/core/app-constant";
import { CommonService } from "@app/core/common-service.service";
import { HttpRequestService } from "@app/core/http-request.service";
import { SharedDataService } from "@app/core/shared-data.service";
import { TODO } from "@app/core/url-constant";
import { ConfirmModalComponent } from "@app/shared/confirm-modal/confirm-modal.component";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import * as lodash from "lodash";
import { TodoFormComponent } from "./todo-form/todo-form.component";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  isLoading: boolean;
  todoList: any = [];
  cacheDuration = "";
  isListFromCache = false;
  modalRef: NgbModalRef = null;
  isAdmin: boolean = true;
  isReadOnly: boolean = true;
  cacheKey = "todo-list";
  isEditMode: boolean = true;
  isProjectSelected: boolean;
  selectedValue: any = null;

  constructor(
    private httpService: HttpRequestService,
    private commonService: CommonService,
    private sharedDataService: SharedDataService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllTodos();
    this.sharedDataService.projectChangeSource.subscribe((flag) => {
      if (flag === YES) {
        this.getAllTodos();
      }
    });

    if (!this.isReadOnly) {
      this.isAdmin = lodash.get(
        this.sharedDataService,
        "userProfile.isAdmin",
        false
      );

      this.sharedDataService.editModeChangeSource.subscribe((flag) => {
        this.isEditMode = flag;
      });
    }
  }

  updateListFromCache(listFromCache, timeStamp) {
    this.todoList = listFromCache;
    this.cacheDuration = timeStamp;
    this.isListFromCache = true;
  }

  refreshList($event) {
    $event && $event.preventDefault();
    this.commonService.localStorageManager.remove(this.cacheKey);
    this.getAllTodos(true);
  }

  getAllTodos(isIgnoreCache?, query?) {
    if (!isIgnoreCache) {
      let cachedLinkData = this.commonService.localStorageManager.load(
        this.cacheKey,
        null
      );
      if (cachedLinkData) {
        this.isListFromCache = true;
        this.cacheDuration = cachedLinkData.timeStamp;
        this.todoList = cachedLinkData.data;
        return;
      }
    }

    this.isProjectSelected = this.sharedDataService.selectedProject != null;
    this.isListFromCache = false;

    this.isLoading = true;
    this.httpService.get(`${TODO}s${query ? "?all=yes" : ""}`).subscribe(
      (resp: IResponse) => {
        this.isLoading = false;
        this.todoList = resp.data;
        this.sharedDataService.addProjectNameField(this.todoList);
        if (!query) {
          this.commonService.localStorageManager.save(
            this.cacheKey,
            this.todoList
          );
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  add($event) {
    $event && $event.preventDefault();
    return;
    this.modalRef = this.modalService.open(TodoFormComponent, {
      size: "lg",
      windowClass: "modal-xxl",
      backdropClass: "light-blue-backdrop",
    });
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then(
      (data) => {
        this.getAllTodos(data);
      },
      (reason) => {}
    );
  }

  delete($event, obj) {
    $event && $event.preventDefault();
    return;
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      backdropClass: "light-blue-backdrop",
    });
    this.modalRef.componentInstance.title = `Delete Todo Item`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService.post(`${TODO}/delete`, { _id: obj._id }).subscribe(
          (resp: IResponse) => {
            this.getAllTodos(true);
          },
          (err) => {}
        );
      }
      this.modalRef.close();
    });
  }

  markDone($event, obj) {
    $event && $event.preventDefault();
    return;
    this.httpService
      .put(`${TODO}`, { _id: obj._id, status: "CLOSE" })
      .subscribe(
        (resp: IResponse) => {
          this.getAllTodos(true);
        },
        (err) => {}
      );
  }

  openAgain($event, obj) {
    $event && $event.preventDefault();
    return;
    this.httpService.put(`${TODO}`, { _id: obj._id, status: "OPEN" }).subscribe(
      (resp: IResponse) => {
        this.getAllTodos(true);
      },
      (err) => {}
    );
  }

  itemSelected(filter) {
    this.selectedValue = filter;
    this.getAllTodos(true, filter);
  }
}
