import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared-module.module';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';
import { AllocationsFormComponent } from './allocations/allocations-form/allocations-form.component';
import { AllocationsComponent } from './allocations/allocations.component';
import { LinksComponent } from './links/links.component';
import { LoginComponent } from './login/login.component';
import { ProjectFormComponent } from './projects/projects-modal/project-form/project-form.component';
import { ProjectsComponent } from './projects/projects.component';
import { QuickNotesFormComponent } from './quick-notes/quick-notes-form/quick-notes-form.component';
import { QuickNotesComponent } from './quick-notes/quick-notes.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { TechnologyFormComponent } from './technology/technology-form/technology-form.component';
import { TechnologyComponent } from './technology/technology.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectFormComponent, TechnologyComponent, TechnologyFormComponent, LinksComponent, AllocationsComponent, AllocationsFormComponent, QuickNotesComponent, LoginComponent, RegisterUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    SharedModule
  ],
  entryComponents: [ProjectFormComponent, TechnologyFormComponent, AllocationsFormComponent, QuickNotesFormComponent]
})
export class AdminModule { }
