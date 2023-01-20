import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {
  @Input() modalTitle: String;
  @Input() modalBody: any;
  @Input() modalFooter: any;

  constructor(private ngbActiveModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.modalTitle);
  }


  dismiss() {
    this.ngbActiveModal.dismiss();
  }
}
