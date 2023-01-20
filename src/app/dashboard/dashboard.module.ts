import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { KnowledgeBaseFormComponent } from "@app/admin/knowledge-base-form/knowledge-base-form.component";
import { LinksFormComponent } from "@app/admin/links/links-form/links-form.component";
import { AllocationsViewComponent } from "@app/dashboard/allocations-view/allocations-view.component";
import { DashBoardRoutingModule } from "@app/dashboard/dashboard-routing.module";
import { LinksViewComponent } from "@app/dashboard/links-view/links-view.component";
import { QuickNotesViewComponent } from "@app/dashboard/quick-notes-view/quick-notes-view.component";
import { SharedModule } from "@app/shared/shared-module.module";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";
import { EncryptDecryptComponent } from "./encrypt-decrypt/encrypt-decrypt.component";
import { KnowledgeBaseComponent } from "./knowledge-base/knowledge-base.component";
import { LearningComponent } from "./learning/learning.component";
import { LintRulesViewComponent } from "./lint-rules-view/lint-rules-view.component";
import { SearchComponent } from "./search/search.component";
import { ContentListComponent } from "./shared-components/content-list/content-list.component";
import { TodoFormComponent } from "./todo/todo-form/todo-form.component";
import { TodoComponent } from "./todo/todo.component";

@NgModule({
  declarations: [
    DashboardHomeComponent,
    LinksViewComponent,
    AllocationsViewComponent,
    QuickNotesViewComponent,
    KnowledgeBaseComponent,
    LearningComponent,
    ContentListComponent,
    LintRulesViewComponent,
    SearchComponent,
    EncryptDecryptComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ],
  entryComponents: [
    KnowledgeBaseFormComponent,
    LinksFormComponent,
    TodoFormComponent,
  ],
})
export class DashBoardModule {}
