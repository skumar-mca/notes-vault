import { Injectable } from "@angular/core";
import * as lodash from "lodash";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  public selectedProject = null;
  public userProfile: IUserProfile = {
    isAdmin: false,
    token: null,
    name: "Guest",
    role: "",
    isSuperAdmin: false,
    userId: "",
  };

  constructor() {
    this.projectSource.subscribe((list) => {
      this.projectList = list;
    });
    this.userChangeSource.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
  }

  /**
   * 1. Sharing projects data
   * 2. Common function for getting project name via project _id
   */
  public projectSource = new BehaviorSubject([]);
  projectList = [];
  updateProjectList(list) {
    this.projectSource.next(list);
  }

  getProjectById(id) {
    return (
      this.projectList &&
      this.projectList.filter((itm) => {
        return itm.projectAlias === id;
      })[0]
    );
  }

  addProjectNameField(list) {
    return list.map((itm) => {
      itm.projectName = lodash.get(
        this.getProjectById(itm.projectId),
        "name",
        itm.projectId
      );
    });
  }

  /**
   * Subscribe to project change event
   */
  public projectChangeSource = new BehaviorSubject("no");
  projectChangeEvent(didProjectChanged: string) {
    this.projectChangeSource.next(didProjectChanged);
  }

  /**
   * Subscribe to user change event
   */
  public userChangeSource = new BehaviorSubject(this.userProfile);
  userChangeEvent(userProfile: any) {
    this.userProfile = userProfile;
    this.userChangeSource.next(userProfile);
  }

  /**
   * Subscribe to edit mode event
   */
  public editModeChangeSource = new BehaviorSubject(false);
  editModeChangeEvent(isEnableEditing: boolean) {
    this.editModeChangeSource.next(isEnableEditing);
  }
}
