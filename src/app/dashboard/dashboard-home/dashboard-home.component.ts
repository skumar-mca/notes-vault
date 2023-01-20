import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/common-service.service';
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  constructor(private httpService: HttpRequestService, private commonService: CommonService, private sharedDataService: SharedDataService) { }

  recentLinksList = [];
  ngOnInit() {
    this.loadRecentLinks();
  }

  loadRecentLinks() {
    let cachedData = this.commonService.localStorageManager.load('recent-links', null);
    if (cachedData) {
      this.recentLinksList = cachedData.data;
    }
  }

  removeFromFav(link) {
    const index = this.recentLinksList.findIndex((itm) => {
      return itm._id === link._id;
    });
    this.recentLinksList.splice(index, 1);
    this.commonService.localStorageManager.save('recent-links', this.recentLinksList);
  }
}
