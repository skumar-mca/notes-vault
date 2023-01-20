import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '@app/core/http-request.service';
import { SEARCH } from '@app/core/url-constant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isLoading: boolean = false;
  searchResult = [];
  linksList = [];
  quickNotesList = [];
  learningList = [];
  term: string = '';

  constructor(private route: ActivatedRoute, private httpService: HttpRequestService) { }

  ngOnInit() {
    this.term = this.route.snapshot.queryParamMap.get('term');

    this.route.queryParams.subscribe((param) => {
      this.term = param.term;
      this.search();
    });
  }

  search() {
    this.isLoading = true;
    this.httpService.get(SEARCH + `?term=${this.term}`).subscribe((resp: IResponse) => {
      this.isLoading = false;
      this.searchResult = resp.data;
      resp.data.forEach(itm => {
        switch (itm.type) {
          case 'Links': this.linksList = itm.data; break;
          case 'quickNotes': this.quickNotesList = itm.data; break;
          case 'learnings': this.learningList = itm.data; break;
        }
      });
    }, (err) => {
      this.isLoading = false;
    })
  }

}
