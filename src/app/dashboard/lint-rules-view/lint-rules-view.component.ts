import { Component, OnInit } from '@angular/core';
import { SONARRULES, DISTINCTSONARRULES } from '@app/core/url-constant';
import { HttpRequestService } from '@app/core/http-request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from '@app/core/shared-data.service';
import { CommonService } from '@app/core/common-service.service';

@Component({
  selector: 'app-lint-rules-view',
  templateUrl: './lint-rules-view.component.html',
  styleUrls: ['./lint-rules-view.component.css']
})
export class LintRulesViewComponent implements OnInit {
  cacheDuration: any;
  isListFromCache: boolean;

  constructor(private httpService: HttpRequestService, private commonService: CommonService, private modalService: NgbModal, private sharedDataService: SharedDataService) { }

  itemList = [];
  distinctRulesList = [];
  isLoading: Boolean = false;
  page = 1;
  pageSize = 20;
  selectedLanguage = '';
  selectedRule = null;
  searchText = '';
  isAdmin = false;

  ngOnInit() {
    this.getDistinctRules();
  }

  getDistinctRules() {
    let cacheKey = `all-lang-sonar`;
    let cachedData = this.commonService.localStorageManager.load(cacheKey, null);
    if (cachedData) {
      this.distinctRulesList = cachedData.data;
      this.getAllRules(null, this.distinctRulesList[0]);
      return;
    }

    this.httpService.get(DISTINCTSONARRULES).subscribe((resp: IResponse) => {
      this.distinctRulesList = resp.data;
      this.commonService.localStorageManager.save(cacheKey, resp.data);
      this.getAllRules(null, this.distinctRulesList[0]);
    }, (err) => {
      this.getAllRules();
    })
  };

  refreshList($event) {
    $event && $event.preventDefault();
    this.getAllRules($event, this.selectedLanguage, true);
  }

  getAllRules($event?, selectedLanguage?, isIgnoreCache?) {
    $event && $event.preventDefault();
    this.selectedLanguage = selectedLanguage;

    let cacheKey = `${selectedLanguage}-sonar`;
    if (!isIgnoreCache) {
      let cachedData = this.commonService.localStorageManager.load(cacheKey, null);
      if (cachedData) {
        this.displayResult(cachedData.data);
        this.cacheDuration = cachedData.timeStamp;
        this.isListFromCache = true;
        return;
      }
    }

    this.isLoading = true;
    this.httpService.get(SONARRULES + (selectedLanguage ? '?language=' + selectedLanguage : '')).subscribe((resp: IResponse) => {
      this.displayResult(resp.data);
      this.commonService.localStorageManager.save(cacheKey, resp.data);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  };

  displayResult(list) {
    this.itemList = list;
    this.selectedRule = this.itemList[0];
    this.getRuleDetails(null, this.selectedRule, 0);
  }

  getRuleDetails($event, rule, index) {
    $event && $event.preventDefault();
    this.selectedRule = rule;

    if (rule.description) {
      return;
    }

    rule.isLoading = true;
    this.httpService.get(SONARRULES + '/detail?id=' + rule._id).subscribe((resp: IResponse) => {
      this.itemList[index] = resp.data[0];
      this.selectedRule = resp.data[0];
      rule.isLoading = false;
    }, (err) => {
      rule.isLoading = false;
    })


  }


}
