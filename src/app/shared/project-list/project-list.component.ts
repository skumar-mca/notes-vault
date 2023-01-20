import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ALL_PROJECTS } from '@app/core/app-constant';
import { SharedDataService } from '@app/core/shared-data.service';
import * as lodash from 'lodash';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() placement = 'bottom'
  @Input() isRequired: Boolean
  @Input() disable: Boolean
  @Input() selectedValue: String = ALL_PROJECTS
  @Output() onItemSelected = new EventEmitter<any>();
  list = [];
  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.projectSource.subscribe((list) => { this.list = list });
  }

  itemSelected(item) {
    this.selectedValue = lodash.get(item, 'name', ALL_PROJECTS);
    this.onItemSelected.emit(lodash.get(item, 'projectAlias', -1));
  }
}
