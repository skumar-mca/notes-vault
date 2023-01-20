import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KnowledgeBaseFormComponent } from '@app/admin/knowledge-base-form/knowledge-base-form.component';
import { LinksFormComponent } from '@app/admin/links/links-form/links-form.component';
import { QuickNotesFormComponent } from '@app/admin/quick-notes/quick-notes-form/quick-notes-form.component';
import { DateDisplayPipe } from '@app/core/date-display.pipe';
import { FilterPipe } from '@app/core/filter.pipe';
import { TimeDurationPipe } from '@app/core/time-duration.pipe';
import { QRViewComponent } from '@app/dashboard/qr-view/qr-view.component';
import { TodoFormComponent } from '@app/dashboard/todo/todo-form/todo-form.component';
import { LeftMenuComponent } from '@app/shared/left-menu/left-menu.component';
import { ModalPopupComponent } from '@app/shared/modal-popup/modal-popup.component';
import { AngularEditorComponent, AngularEditorModule } from '@kolkov/angular-editor';
import { NgbDropdownModule, NgbPagination, NgbPaginationModule, NgbPopover, NgbPopoverModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionButtonComponent } from './action-button/action-button.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CopyToClipboardComponent } from './copy-to-clipboard/copy-to-clipboard.component';
import { CrudMessageDisplayComponent } from './crud-message-display/crud-message-display.component';
import { CrudService } from './crud.service';
import { LoaderComponent } from './loader/loader.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';
@NgModule({
  declarations: [ModalPopupComponent, LinksFormComponent, QuickNotesFormComponent, LoaderComponent, TypeAheadComponent, TimeDurationPipe, DateDisplayPipe, LeftMenuComponent, FilterPipe, KnowledgeBaseFormComponent, ConfirmModalComponent, CopyToClipboardComponent, ProjectListComponent, CrudMessageDisplayComponent, ActionButtonComponent, TodoFormComponent, QRViewComponent],
  exports: [ModalPopupComponent, FormsModule, ReactiveFormsModule, LoaderComponent, TypeAheadComponent, AngularEditorComponent, TimeDurationPipe, DateDisplayPipe, LeftMenuComponent, NgbPagination, FilterPipe, CopyToClipboardComponent, ProjectListComponent, QuickNotesFormComponent, NgbPopover, CrudMessageDisplayComponent, ActionButtonComponent, QRViewComponent],
  providers: [CrudService],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    AngularEditorModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbPopoverModule
  ],
  entryComponents: [KnowledgeBaseFormComponent, ConfirmModalComponent, LinksFormComponent, QuickNotesFormComponent, TodoFormComponent]
})
export class SharedModule { }
