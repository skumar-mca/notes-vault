import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.css']
})
export class TypeAheadComponent implements OnInit {
  constructor() { }

  @ViewChild('instance') instance: NgbTypeahead;
  @Input() list = []
  @Input() placement = 'bottom'
  @Input() isRequired: Boolean
  @Input() formControlName = []
  @Input() selectedValue: String

  @Output() onItemSelected = new EventEmitter<any>();

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  ngOnInit() {

  }

  formatter = (result) => { return result.name; };

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.list
        : this.list.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  itemSelected(item) {
    this.selectedValue = '';
    this.onItemSelected.emit(item.item._id);
  }
}
