import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpRequestService } from '@app/core/http-request.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  currentForm: FormGroup
  selectedRecord: any
  message = {
    type: 1,
    text: ''
  };

  isLoading: Boolean = false;
  modalTitle: String = 'Add Allocation';
  ngbActiveModal: any
  formFields: string[];
  APIURL: string

  constructor(private httpService: HttpRequestService) { }

  initialize(ngbActiveModal, URL, formFields, modalTitle) {
    this.ngbActiveModal = ngbActiveModal;
    this.APIURL = URL;
    this.formFields = formFields;
    this.modalTitle = modalTitle;
    this.message.text = '';
  }

  buildPostData(postData) {
    this.formFields.forEach((itm: any) => {
      if (itm.type === 'date') {
        let val = this.currentForm.get(itm.name).value
        postData[itm.name] = moment(`${val.day}-${val.month}-${val.year}`, 'DD-MM-YYYY');
      }
      else {
        postData[itm.name] = this.currentForm.get(itm.name).value;
      }
    });
    return postData;
  }

  setFields(obj) {
    this.formFields.forEach((itm: any) => {
      if (itm.type === 'date') {
        let val = moment(obj[itm.name]);
        this.currentForm.get(itm.name).setValue({ year: val.year(), month: val.month() + 1, day: val.date() });
      }
      else {
        this.currentForm.get(itm.name).setValue(obj[itm.name]);
      }
    });
  }

  messageHandler =
    {
      reset: () => {
        this.message.type = 1;
        this.message.text = '';
      },
      setSuccess: (msg) => {
        this.message.type = 1;
        this.message.text = msg;
      },
      setError: (msg) => {
        this.message.type = 0;
        this.message.text = msg;
      }
    }

  save(cb?) {
    this.messageHandler.reset();
    if (this.selectedRecord) {
      this.update(cb);
      return;
    }

    let postData = this.buildPostData({});

    this.isLoading = true;
    this.httpService.post(this.APIURL, postData).subscribe((resp: IResponse) => {
      this.isLoading = false;
      this.messageHandler.setSuccess(resp.message);
      cb && cb(resp.data);

      if (resp.success) {
        setTimeout(() => {
          this.close(true);
        }, 500);
      }
    }, (err) => {
      cb && cb(null);
      this.messageHandler.setError(err);
      this.isLoading = false;
    })
  }

  update(cb?) {
    this.messageHandler.reset();
    let postData = this.selectedRecord;

    postData = this.buildPostData(postData);

    this.isLoading = true;
    this.httpService.put(this.APIURL, postData).subscribe((resp: IResponse) => {
      this.isLoading = false;

      this.messageHandler.setSuccess(resp.message);
      cb && cb(resp.data);
      if (resp.success) {
        setTimeout(() => {
          this.close(true);
        }, 500);
      }
    }, (err) => {
      this.isLoading = false;
      this.messageHandler.setError(err);
      cb && cb(null);
    })
  }

  edit(obj) {
    this.modalTitle = "Edit Allocation";
    this.selectedRecord = obj;
    setTimeout(() => {
      this.setFields(obj);
    })
  }

  dismiss() {
    if (this.ngbActiveModal) {
      this.ngbActiveModal.dismiss();
      this.selectedRecord = null;
    }
  }

  close(isUpdated?) {
    if (this.ngbActiveModal) {
      this.ngbActiveModal.close(isUpdated);
      this.selectedRecord = null;
    }
  }
}