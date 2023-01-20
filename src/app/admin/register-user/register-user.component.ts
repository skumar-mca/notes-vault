import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedDataService } from '@app/core/shared-data.service';
import { HttpRequestService } from '@app/core/http-request.service';
import { REGISTER, USERS } from '@app/core/url-constant';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
import { YES } from '@app/core/app-constant';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formFields = [
    { name: 'name' },
    { name: 'username' },
    { name: 'password' },
    { name: 'isAdmin' },
    { name: 'secret' }
  ];
  modalRef: NgbModalRef = null
  form: any;
  errorMessage: String = '';
  isLoading: Boolean = false;
  usersList: any;
  isEdit: Boolean = false;
  selectedUser: any;
  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService, private httpService: HttpRequestService, private modalService: NgbModal) {
    this.createForm();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      isAdmin: ['', Validators.required],
      secret: ['', Validators.required]
    })
  }

  register() {
    this.errorMessage = '';
    const postData = {
      userName: this.username.value,
      password: this.password.value,
      name: this.name.value,
      isAdmin: this.isAdmin.value
    };
    this.isLoading = true;
    this.httpService.post(REGISTER, postData).subscribe((resp: IResponse) => {
      this.isLoading = false;
      if (resp.success) {
        this.getAllUsers();
        return;
      }
      this.errorMessage = resp.message;
    }, (err) => {
      this.isLoading = false;
      this.errorMessage = err;
    });
  }

  addUser() {
    this.selectedUser = null;
    this.isEdit = false;
  }

  edit(user) {
    this.selectedUser = user;
    this.isEdit = true;
    this.form.get('name').setValue(user.name);
    this.form.get('isAdmin').setValue(user.isAdmin);
  }

  delete(obj) {
    this.modalRef = this.modalService.open(ConfirmModalComponent, { backdropClass: 'light-blue-backdrop' });
    this.modalRef.componentInstance.title = `Delete user`;
    this.modalRef.componentInstance.onOK.subscribe((resp) => {
      this.addUser();
      if (resp === YES) {
        this.httpService.post(`${USERS}/delete`, { _id: obj._id }).subscribe((resp: IResponse) => {
          this.isLoading = false;
          this.getAllUsers();
        }, (err) => {
          this.isLoading = false;
        })
      }
      this.modalRef.close();
    })
  }

  getAllUsers() {
    this.isLoading = true;
    this.httpService.get(USERS + 's').subscribe((resp: IResponse) => {
      this.isLoading = false;
      if (resp.success) {
        this.usersList = resp.data;
        return;
      }
      this.errorMessage = resp.message;
    }, (err) => {
      this.isLoading = false;
      this.errorMessage = err;
    });
  }

  updateUser() {
    const putData = {
      _id: this.selectedUser._id,
      name: this.name.value,
      isAdmin: this.isAdmin.value
    };

    this.httpService.put(`${USERS}`, putData).subscribe((resp: IResponse) => {
      this.getAllUsers();
    }, (err) => {
    })
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
