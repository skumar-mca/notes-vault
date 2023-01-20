import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinksViewComponent } from '@app/dashboard/links-view/links-view.component';
import { QuickNotesViewComponent } from '@app/dashboard/quick-notes-view/quick-notes-view.component';
import { AllocationsViewComponent } from '@app/dashboard/allocations-view/allocations-view.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { LearningComponent } from './learning/learning.component';
import { LintRulesViewComponent } from './lint-rules-view/lint-rules-view.component';
import { SearchComponent } from './search/search.component';
import { EncryptDecryptComponent } from './encrypt-decrypt/encrypt-decrypt.component';
import { adminAuthGaurd } from '../core/oauth-callback.guard';

const routes: Routes = [
  { path: '', component: DashboardHomeComponent, canActivate: [adminAuthGaurd] },
  { path: 'bookmarks', component: LinksViewComponent, canActivate: [adminAuthGaurd] },
  { path: 'quick-notes', component: QuickNotesViewComponent, canActivate: [adminAuthGaurd] },
  { path: 'allocations', component: AllocationsViewComponent, canActivate: [adminAuthGaurd] },
  { path: 'knowledge-base', component: KnowledgeBaseComponent, canActivate: [adminAuthGaurd] },
  { path: 'learning', component: LearningComponent, canActivate: [adminAuthGaurd] },
  { path: 'lint-rules', component: LintRulesViewComponent, canActivate: [adminAuthGaurd] },
  { path: 'search', component: SearchComponent, canActivate: [adminAuthGaurd] },
  { path: 'encode-decode', component: EncryptDecryptComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [adminAuthGaurd]
})
export class DashBoardRoutingModule { }
