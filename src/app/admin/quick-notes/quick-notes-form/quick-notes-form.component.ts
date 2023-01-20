import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WYSIWYG_CONFIG } from '@app/core/app-constant';
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';
import { QUICKNOTE } from '@app/core/url-constant';
import { CrudService } from '@app/shared/crud.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import * as lodash from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quick-notes-form',
  templateUrl: './quick-notes-form.component.html',
  styleUrls: ['./quick-notes-form.component.css']
})
export class QuickNotesFormComponent implements OnInit {
  formCtrlSub: any;
  triggerUpdatePipeValue: any = null;
  isEditorFullScreen: Boolean = false;
  editorConfig: AngularEditorConfig = WYSIWYG_CONFIG;
  isDecryptionEnable: boolean = false;
  isDescriptionDecrypted: boolean = false;
  encryptedDescription: string = '';
  isDecryptionError: boolean = false;
  isEncryptionRequired: boolean = false;
  modalRef: NgbModalRef = null

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeEditorTextArea();
  }

  @ViewChild('noteTitle') txtNoteTitle: ElementRef;
  @ViewChild('encryptedSecret') txtEncryptedSecret: ElementRef;
  @ViewChild('decrytBox') decrytBox: ElementRef;

  formFields = [
    { name: 'title' },
    { name: 'description' },
    { name: 'projectId' },
    { name: 'isEncrypt' }
  ];

  @Input() selectedNote = null;

  selectedprojectName: any;
  projectsList: any[];
  isEditMode = false;
  isLoading: Boolean = false;
  isAdmin: Boolean = false;
  modelChanged: Subject<string> = new Subject<string>();

  @Output() onItemSave = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private modalService: NgbModal, public crudService: CrudService, private sharedDataService: SharedDataService, private httpService: HttpRequestService) {
    this.createForm();
  }

  ngOnInit() {
    this.crudService.initialize(null, QUICKNOTE, this.formFields, "Add Quick Note");
    this.sharedDataService.projectSource.subscribe((list) => { this.projectsList = list });
    this.isEditMode = this.crudService.modalTitle.indexOf('Edit') > -1
    this.isAdmin = lodash.get(this.sharedDataService, 'userProfile.isAdmin', false);

    if (this.isAdmin) {
      this.addNew();
      this.focusOnTitleField();
      // this.modelChanged.pipe(
      //   debounceTime(1000 * 20),
      //   distinctUntilChanged())
      //   .subscribe((model) => { this.autoSave(); });
      this.resizeEditorTextArea();
    }
  }

  focusOnTitleField() {
    this.txtNoteTitle && this.txtNoteTitle.nativeElement.focus();
  }
  onItemSelected(id) {
    this.crudService.currentForm.get('projectId').setValue(id);
  }

  createForm() {
    this.crudService.currentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      projectId: [''],
      isEncrypt: [false]
    })
  }

  save(isSaveAndClose?: Boolean) {
    this.crudService.save((response) => {
      if (response) {

        this.crudService.edit(response);
        this.selectedNote = response;
        this.sharedDataService.addProjectNameField([this.selectedNote]);
        setTimeout(() => { this.crudService.messageHandler.reset(); }, 2000);
        //this.enableAutoUpdateTimeDisplay();

        // Refresh items on list page 
        if (isSaveAndClose) {
          this.onItemSave.emit(true);
          if (this.isEditorFullScreen) {
            this.toggleFullScreenMode();
          }
          return;
        }

        // remain on same page and update same record on save 
        this.crudService.selectedRecord = response;
      }
    });
  }

  addNew() {
    this.isEditMode = true;
    this.focusOnTitleField();
    this.selectedNote = null;
    this.crudService.modalTitle = "Add Quick Note";
    this.crudService.selectedRecord = null;
    this.title.setValue('');
    this.description.setValue('');
    this.projectId.setValue('');

    // Set selected project as default selected in project field in CREATE mode
    if (!this.selectedNote && this.sharedDataService.selectedProject) {
      this.selectedprojectName = this.sharedDataService.selectedProject.name || null;
      this.crudService.currentForm.get('projectId').setValue(this.sharedDataService.selectedProject.projectAlias);
    }
  }

  changed(text: string) {
    this.modelChanged.next(text);
  }

  // autoSave() {
  //   if (!this.projectId.value) {
  //     let selectFirstProject = this.projectsList[0];
  //     if (selectFirstProject) {
  //       this.selectedprojectName = selectFirstProject.name || null;
  //       this.crudService.currentForm.get('projectId').setValue(selectFirstProject._id);
  //     }
  //   }

  //   if (!this.title.value) {
  //     this.title.setValue('Auto saved content -' + new Date().getMilliseconds());
  //   }

  //   this.save(true);
  // }

  edit(obj, isEdit?) {
    this.isEditMode = isEdit;
    this.isDescriptionDecrypted = false;

    if (this.isEditMode && obj.isEncrypt) {
      this.showDecrytBox();
      this.focusOnTitleField();
    }
    this.isEncryptionRequired = false;
    //this.enableAutoUpdateTimeDisplay();
    this.crudService.modalTitle = "Edit Quick Note";
    this.selectedprojectName = obj.projectName || obj.projectId;
    this.crudService.isLoading = true;
    this.httpService.get(`${QUICKNOTE}/${obj._id}`).subscribe((resp: IResponse) => {
      this.crudService.isLoading = false;
      if (resp.success) {
        this.selectedNote = resp.data;
        this.crudService.edit(resp.data);
      }
    }, (err) => {
      this.crudService.isLoading = false;
      this.crudService.message = err;
    });


    if (obj.isEncrypt) {
      this.isEncryptionRequired = true;
    }
  }

  get title() {
    return this.crudService.currentForm.get('title');
  }

  get description() {
    return this.crudService.currentForm.get('description');
  }

  get projectId() {
    return this.crudService.currentForm.get('projectId');
  }

  get isEncrypt() {
    return this.crudService.currentForm.get('isEncrypt');
  }

  resizeEditorTextArea() {
    // let editor = document.getElementById('editorContent');
    let appHeader = document.getElementById("app-header");
    if (!this.isEditorFullScreen) {
      this.editorConfig.height = (window.innerHeight - (appHeader.clientHeight) - 250) + 'px';
      //editor.style.height = (window.innerHeight - (appHeader.clientHeight) - 175) + 'px';
      return;
    }

    this.editorConfig.height = (window.innerHeight - (appHeader.clientHeight) - 180) + 'px';
    //editor.style.height = (window.innerHeight - 175) + 'px'
  }

  // autoTriggerTimer = null;
  // clearAutTimer() {
  //   if (this.autoTriggerTimer) {
  //     clearInterval(this.autoTriggerTimer);
  //     this.triggerUpdatePipeValue = 1;
  //   }
  // }
  // enableAutoUpdateTimeDisplay() {
  //   this.clearAutTimer();

  //   this.autoTriggerTimer = setInterval(() => {
  //     this.triggerUpdatePipeValue++;
  //   });
  // }

  toggleFullScreenMode($event?) {
    $event && $event.preventDefault();
    this.isEditorFullScreen = !this.isEditorFullScreen;
    this.resizeEditorTextArea();
  }

  cancel() {
    this.isEditMode = false
    if (this.isEditorFullScreen) {
      this.toggleFullScreenMode();
    }
  }

  // toggleDecryption() {
  //   this.isDecryptionError = false;
  //   this.isDecryptionEnable = !this.isDecryptionEnable;

  //   if (this.isDecryptionEnable) {
  //     setTimeout(() => {
  //       this.txtEncryptedSecret && this.txtEncryptedSecret.nativeElement.focus();
  //     }, 200);
  //   }
  // }

  decyptMessage($event, secret) {
    $event && $event.preventDefault();
    this.isDecryptionError = false;
    this.encryptedDescription = this.description.value;
    const bytes = AES.decrypt(this.encryptedDescription, secret);

    if (bytes.sigBytes <= 0) {
      this.isDecryptionError = true;
      return;
    }
    else {
      this.isDescriptionDecrypted = true;
      this.description.setValue(unescape(bytes.toString(CryptoJS.enc.Utf8)));
      this.modalRef.close();
    }
  }

  encryptAgain() {
    this.isDescriptionDecrypted = false;
    this.description.setValue(this.encryptedDescription);
  }

  showDecrytBox() {
    this.isDecryptionError = false;
    this.isDescriptionDecrypted = false;
    this.encryptedDescription = '';
    this.modalRef = this.modalService.open(this.decrytBox, { backdropClass: 'light-blue-backdrop' });
    setTimeout(() => {
      this.txtEncryptedSecret && this.txtEncryptedSecret.nativeElement.focus();
    }, 200);
  }

  ngOnDestroy() {
    //this.clearAutTimer();
  }
}

