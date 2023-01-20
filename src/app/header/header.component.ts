import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ALL_PROJECTS, LS_CONSTANTS, YES } from '@app/core/app-constant';
import { CommonService } from '@app/core/common-service.service';
import { SharedDataService } from '@app/core/shared-data.service';
import * as lodash from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  projectList: any;
  selectedProject: String = "All projects";
  userProfile: IUserProfile = null;
  @ViewChild('searchText') searchText: ElementRef;

  constructor(private route: ActivatedRoute, private sharedDataService: SharedDataService, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.userProfile = lodash.get(this.sharedDataService, 'userProfile', { token: null });
    this.sharedDataService.userChangeSource.subscribe((resp) => {
      this.userProfile = lodash.get(this.sharedDataService, 'userProfile', { token: null });
    });

    this.sharedDataService.projectSource.subscribe((resp) => {
      this.projectList = resp;
      if (this.sharedDataService.selectedProject) {
        this.onProjectSelection(this.sharedDataService.selectedProject);
      }
    });

    this.route.queryParams.subscribe((param) => {
      this.searchText.nativeElement.value = param.term || '';
    });

  }

  onProjectSelection(proj) {
    if (proj) {
      this.selectedProject = proj.name;
      this.commonService.localStorageManager.save(LS_CONSTANTS.SELECTED_PROJECT, proj);
    }
    else {
      this.selectedProject = ALL_PROJECTS;
      this.commonService.localStorageManager.remove(LS_CONSTANTS.SELECTED_PROJECT);
    }

    this.sharedDataService.selectedProject = proj;
    this.sharedDataService.projectChangeEvent(YES);
  }

  logOut($event) {
    $event && $event.preventDefault();
    localStorage.removeItem('u-p');
    this.sharedDataService.userProfile = null;
    this.sharedDataService.userChangeEvent({});
    this.router.navigateByUrl('/admin/login');
  }

  onNavigateTo(url) { this.router.navigateByUrl(url); }

  doNothing($event) {
    $event && $event.preventDefault();
  }

  search($event, term) {
    $event && $event.preventDefault();
    if ((term || '').length === 0) {
      this.router.navigateByUrl('/dashboard');
      return;
    }
    this.router.navigateByUrl('/dashboard/search?term=' + term);
  }

  isEditModeEnabled = false;
  toggleEditMode($event) {
    this.isEditModeEnabled = !this.isEditModeEnabled;
    $event && $event.preventDefault();
    this.sharedDataService.editModeChangeEvent(this.isEditModeEnabled);
  }

  getInitialsForName(name) {
    let initials = `${name || ''}`.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

}
