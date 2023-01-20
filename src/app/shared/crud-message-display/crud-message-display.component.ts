import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crud-message-display',
  templateUrl: './crud-message-display.component.html',
  styleUrls: ['./crud-message-display.component.css']
})
export class CrudMessageDisplayComponent implements OnInit {
  constructor() { }
  @Input() message = null

  ngOnInit() {
  }
}
