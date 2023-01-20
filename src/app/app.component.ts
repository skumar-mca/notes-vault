import { Component, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { DeviceType } from "./core/app-constant";
import { CommonService } from "./core/common-service.service";
import { HttpRequestService } from "./core/http-request.service";
import { SharedDataService } from "./core/shared-data.service";
import { PROJECT } from "./core/url-constant";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  model = {
    left: "",
    middle: "",
    right: "",
  };
  message: string;
  subscription: Subscription;

  constructor(
    private httpService: HttpRequestService,
    private sharedDataService: SharedDataService,
    private commonService: CommonService
  ) {}

  deviceType = DeviceType.Desktop;
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.deviceType = this.getDeviceType(window.innerWidth);
  }

  getDeviceType = (width) => {
    if (width <= 768) {
      return DeviceType.Mobile;
    }

    if (width > 768 && width <= 950) {
      return DeviceType.Tablet;
    }

    if (width > 950 && width <= 1400) {
      return DeviceType.Desktop;
    }

    return DeviceType.LargeDesktop;
  };

  ngOnInit() {
    this.onResize();

    let selectedProjectCache = this.commonService.localStorageManager.load(
      "selectedProject",
      null
    );
    if (selectedProjectCache) {
      this.sharedDataService.selectedProject = selectedProjectCache.data;
    }

    const userProfileCache = localStorage.getItem("u-p");
    if (userProfileCache) {
      this.sharedDataService.userChangeEvent(JSON.parse(userProfileCache));
    }

    this.getProjects();
  }
  getProjects() {
    const cacheKey = "project-list";
    const cachedData = this.commonService.localStorageManager.load(
      cacheKey,
      null
    );
    if (cachedData) {
      this.sharedDataService.updateProjectList(cachedData.data);
      return;
    }

    this.httpService.get(PROJECT + "s").subscribe((resp: IResponse) => {
      this.sharedDataService.updateProjectList(resp.data);
      this.commonService.localStorageManager.save(cacheKey, resp.data);
    });
  }
}
