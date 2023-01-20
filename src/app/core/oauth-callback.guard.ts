import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as lodash from 'lodash';
import { SharedDataService } from './shared-data.service';
@Injectable()
export class adminAuthGaurd implements CanActivate {
  userDataFromLocalStorage: any = {};
  sessionData: any;
  isAdmin: any;
  constructor(
    private sharedDataService: SharedDataService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //const isValid = lodash.get(this.sharedDataService, 'userProfile.isAdmin', false);
    const isValid = lodash.get(this.sharedDataService, 'userProfile.name', false);
    if (isValid && isValid != 'Guest') {
      return true;
    }

    this.router.navigate(['/admin/login'], { queryParams: { return: state.url } });
    return false;
  }
}
