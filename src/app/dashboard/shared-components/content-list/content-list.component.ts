import { Component, Input, OnInit } from "@angular/core";
import { KnowledgeBaseFormComponent } from "@app/admin/knowledge-base-form/knowledge-base-form.component";
import { KNOWLEDGE_BASE_CATEGORY, YES } from "@app/core/app-constant";
import { CommonService } from "@app/core/common-service.service";
import { HttpRequestService } from "@app/core/http-request.service";
import { SharedDataService } from "@app/core/shared-data.service";
import { KNOWLEDGEBASE } from "@app/core/url-constant";
import { ConfirmModalComponent } from "@app/shared/confirm-modal/confirm-modal.component";
import { CrudService } from "@app/shared/crud.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import * as lodash from "lodash";

@Component({
  selector: "app-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.css"],
})
export class ContentListComponent implements OnInit {
  isAdmin: any;
  isListFromCache: boolean = false;
  cacheDuration: any = "";
  isEditMode: boolean = false;
  constructor(
    private httpService: HttpRequestService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private sharedDataService: SharedDataService,
    private crudService: CrudService
  ) {}

  @Input() category;

  itemList = [];
  isLoading: Boolean = false;
  page = 1;
  pageSize = 20;
  modalRef: NgbModalRef = null;
  selectedItem = null;

  ngOnInit() {
    this.isAdmin = lodash.get(
      this.sharedDataService,
      "userProfile.isAdmin",
      false
    );

    this.category = KNOWLEDGE_BASE_CATEGORY.filter((itm) => {
      return itm.id === this.category;
    })[0];

    this.sharedDataService.editModeChangeSource.subscribe((flag) => {
      this.isEditMode = flag;
    });

    this.getAllKnowledgeBase();
  }

  refreshList($event) {
    $event && $event.preventDefault();
    this.getAllKnowledgeBase(true);
  }

  getAllKnowledgeBase(isIgnoreCache?) {
    let cacheKey = `${this.category.id}-kb`;
    if (!isIgnoreCache) {
      let cachedData = this.commonService.localStorageManager.load(
        cacheKey,
        null
      );
      if (cachedData) {
        this.itemList = cachedData.data;
        this.cacheDuration = cachedData.timeStamp;
        this.isListFromCache = true;
        return;
      }
    }

    this.isLoading = true;
    this.httpService
      .get(`${KNOWLEDGEBASE}?category=` + this.category.id)
      .subscribe(
        (resp: IResponse) => {
          this.itemList = resp.data;
          this.commonService.localStorageManager.save(cacheKey, this.itemList);
          this.isListFromCache = false;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  getDetails(obj) {
    const index = lodash.findIndex(this.itemList, (itm) => itm._id == obj._id);
    // if (obj.isExpanded) {
    //   this.itemList[index].isExpanded = false;
    //   return;
    // }

    this.selectedItem = obj;
    obj.collapsed = !obj.collapsed;

    if (obj.content) {
      return;
    }

    obj.isLoading = true;
    this.httpService
      .get(`${KNOWLEDGEBASE}/${obj._id}?category=${obj.category.id}`)
      .subscribe(
        (resp: IResponse) => {
          obj.isLoading = false;
          if (resp.success) {
            obj.content = resp.data.content;
            this.itemList[index].content = resp.data.content;
            this.itemList[index].isExpanded = true;
            obj.collapsed = false;
            this.selectedItem = obj;
          }
        },
        (err) => {
          obj.isLoading = false;
        }
      );
  }

  add($event) {
    $event && $event.preventDefault();
    return;
    this.selectedItem = null;
    this.crudService.selectedRecord = null;
    this.modalRef = this.modalService.open(KnowledgeBaseFormComponent, {
      size: "lg",
      windowClass: "modal-xxl",
      backdropClass: "light-blue-backdrop",
    });
    this.modalRef.componentInstance.category = this.category;
    this.bindClose();
  }

  bindClose() {
    this.modalRef.result.then(
      (data) => {
        this.crudService.selectedRecord = null;
        this.getAllKnowledgeBase(true);
      },
      (reason) => {
        this.crudService.selectedRecord = null;
      }
    );
  }

  edit($event, obj) {
    $event && $event.preventDefault();
    return;
    this.modalRef = this.modalService.open(KnowledgeBaseFormComponent, {
      size: "lg",
      windowClass: "modal-xxl",
      backdropClass: "light-blue-backdrop",
    });
    this.modalRef.componentInstance.category = this.category;
    this.bindClose();
    this.modalRef.componentInstance.edit(obj);
  }

  delete($event, obj) {
    $event && $event.preventDefault();
    return;
    this.modalRef = this.modalService.open(ConfirmModalComponent, {
      backdropClass: "light-blue-backdrop",
    });
    this.modalRef.componentInstance.title = `Delete ${this.category.title} Item`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      if (resp === YES) {
        this.httpService
          .post(`${KNOWLEDGEBASE}/delete`, { _id: obj._id })
          .subscribe(
            (resp: IResponse) => {
              this.getAllKnowledgeBase(true);
            },
            (err) => {}
          );
      }
      this.modalRef.close();
    });
  }
}
