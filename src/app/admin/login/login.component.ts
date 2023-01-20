import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';
import { LOGIN } from '@app/core/url-constant';
import * as jwt_decode from 'jwt-decode';
import * as lodash from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formFields = [
    { name: 'username' },
    { name: 'password' }
  ];
  userProfile: { isAdmin: boolean; userId: string };
  loginForm: any;
  error = {
    success: true,
    message: ''
  };
  isLoading: Boolean = false;
  returnUrl: string = '';

  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService, private httpService: HttpRequestService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    //this.sharedDataService.userChangeSource.subscribe((profile) => { this.userProfile = profile });
    this.route.queryParams.subscribe(params => this.returnUrl = params['return']);
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.error.message = '';
    const postData = {
      userName: this.username.value,
      password: this.password.value
    };

    this.isLoading = true;
    this.httpService.post(LOGIN, postData).subscribe((resp: IResponse) => {
      this.isLoading = false;
      this.error.success = Boolean(resp.success);
      this.error.message = resp.message;

      if (resp.success) {
        const decoded = jwt_decode(resp.data);
        if (decoded) {
          const role = lodash.get(decoded, 'roleName', '');
          const payLoadData: IUserProfile = {
            userId: lodash.get(decoded, 'userId', null),
            name: lodash.get(decoded, 'name', 'Guest'),
            isAdmin: role === 'admin',
            isSuperAdmin: role === 'superAdmin',
            role: role,
            token: resp.data
          };

          this.userProfile = lodash.get(this.sharedDataService, 'userProfile', { token: null });
          if (this.userProfile.userId != payLoadData.userId) {
            localStorage.clear();
          }

          localStorage.setItem('u-p', JSON.stringify(payLoadData))
          this.sharedDataService.userChangeEvent(payLoadData);

          this.error.message += '. Navigating to dashboard...';

          setTimeout(() => {
            this.navigateToDashboard();
          }, 1500);
        }
        return;
      }
    }, (err) => {
      this.isLoading = false;
      this.error.success = false;
      this.error.message = err;
    })
  }

  navigateToDashboard() {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }

    this.router.navigateByUrl('/dashboard');
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
