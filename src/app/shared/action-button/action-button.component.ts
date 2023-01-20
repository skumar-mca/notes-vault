import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {

  constructor() { }

  @Input() caption: String = '';
  @Input() obj: any = null;

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  ngOnInit() {
  }

  edit($event) {
    $event.preventDefault();
    this.onEdit.emit(this.obj);
  }

  delete($event) {
    $event.preventDefault();
    this.onDelete.emit(this.obj);
  }
}
