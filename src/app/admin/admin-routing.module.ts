import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TechnologyComponent } from './technology/technology.component';
import { LinksComponent } from './links/links.component';
import { AllocationsComponent } from './allocations/allocations.component';
import { QuickNotesComponent } from './quick-notes/quick-notes.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { adminAuthGaurd } from '../core/oauth-callback.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'technologies', component: TechnologyComponent },
  { path: 'bookmarks', component: LinksComponent },
  { path: 'allocations', component: AllocationsComponent },
  { path: 'quick-notes', component: QuickNotesComponent },
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [adminAuthGaurd]
})
export class AdminRoutingModule { }
