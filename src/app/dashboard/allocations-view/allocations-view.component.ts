import { Component, OnInit } from '@angular/core';
import { YES } from '@app/core/app-constant.js';
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';
import { ALLOCATION } from '@app/core/url-constant';
import * as lodash from 'lodash';
import * as Chart from '../../../assets/scripts/chart.min.js';
import { CommonService } from '@app/core/common-service.service.js';

@Component({
  selector: 'app-allocations-view',
  templateUrl: './allocations-view.component.html',
  styleUrls: ['./allocations-view.component.css']
})
export class AllocationsViewComponent implements OnInit {
  isProjectSelected: boolean;
  isListFromCache: boolean;

  constructor(private httpService: HttpRequestService, private sharedDataService: SharedDataService, private commonService: CommonService) { }
  allocationsList = [];
  isLoading: Boolean = false;
  selectedDurationOption: Number = 1;
  cacheKey = `allocations`;
  totalCapacity: Number = 100;
  cacheDuration: any;
  ngOnInit() {
    this.getAllAllocations();
  }

  refreshList($event) {
    $event && $event.preventDefault();
    this.getAllAllocations(true);
  }

  getAllAllocations(isIgnoreCache?) {
    if (!isIgnoreCache) {
      let cachedLinkData = this.commonService.localStorageManager.load(this.cacheKey, null);
      if (cachedLinkData) {
        this.isListFromCache = true;
        this.cacheDuration = cachedLinkData.timeStamp;
        this.displayList(cachedLinkData.data);
        return;
      }
    }

    this.isListFromCache = false;
    this.isProjectSelected = this.sharedDataService.selectedProject != null;
    this.isLoading = true;
    this.httpService.get(ALLOCATION + 's?filter=true').subscribe((resp: IResponse) => {
      // this.allocationsList = resp.data;
      // this.totalCapacity = lodash.sumBy(this.allocationsList, (itm) => { return itm.percentage });
      this.sharedDataService.addProjectNameField(resp.data);
      this.commonService.localStorageManager.save(this.cacheKey, resp.data);
      this.isLoading = false;
      // setTimeout(() => {
      //   this.buildChart();
      // }, 500);
      this.displayList(resp.data);
    }, (err) => {
      this.isLoading = false;
    });
  }

  displayList(list) {
    this.allocationsList = list;
    this.totalCapacity = lodash.sumBy(this.allocationsList, (itm) => { return itm.percentage });
    this.isLoading = false;
    setTimeout(() => {
      this.buildChart();
    }, 500);
  }

  noop($event, alloc) {
    $event && $event.preventDefault();
    alloc.showNotes = !alloc.showNotes;
  }

  randomScalingFactor = () => {
    return Math.round(Math.random() * 100);
  };

  chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  buildChart() {

    let config = {
      type: 'pie',
      data: {
        datasets: [{
          data: lodash.map(this.allocationsList, 'percentage'),
          backgroundColor: [
            this.chartColors.red,
            this.chartColors.orange,
            this.chartColors.yellow,
            this.chartColors.green,
            this.chartColors.blue,
          ],
          label: 'Dataset 1'
        }],
        labels: lodash.map(this.allocationsList, 'projectName')
      },
      options: {
        responsive: false,
        title: { display: true, text: 'Project Allocation' },
        legend: { display: true }
      }
    };

    var ctx = document.getElementById('myChart');
    if (ctx) {
      var myChart = new Chart(ctx, config);
    }

  }
}
