import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YES, NO } from '@app/core/app-constant';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: String = 'Confirm deletion';
  @Output() onOK = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ok() {
    this.onOK.next(YES);
  }

  cancel() {
    this.onOK.next(NO);
  }

}