import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '@app/core/shared-data.service';
import { HttpRequestService } from '@app/core/http-request.service';
import { REGISTER, USERS } from '@app/core/url-constant';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
import { YES } from '@app/core/app-constant';
import { ValidationService } from '@app/core/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formFields = [
    { name: 'name' },
    { name: 'username' },
    { name: 'password' }
  ];
  modalRef: NgbModalRef = null
  form: any;
  errorMessage: String = '';
  isLoading: Boolean = false;
  usersList: any;
  isEdit: Boolean = false;
  selectedUser: any;

  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService, private httpService: HttpRequestService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  register() {
    this.errorMessage = '';
    const postData = {
      userName: this.username.value,
      password: this.password.value,
      name: this.name.value,
    };

    this.isLoading = true;
    this.httpService.post(REGISTER, postData).subscribe((resp: IResponse) => {
      this.isLoading = false;
      this.errorMessage = resp.message;
    }, (err) => {
      this.isLoading = false;
      this.errorMessage = err;
    });
  }

  cancelEdit() {
    this.isEdit = false;
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get name() {
    return this.form.get('name');
  }
  get isAdmin() {
    return this.form.get('isAdmin');
  }


}
