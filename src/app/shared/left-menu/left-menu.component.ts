import { Component, HostListener, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.scss"],
})
export class LeftMenuComponent implements OnInit {
  URL: string;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.resizeLeftPanel();
  }

  @Input() linktype = "admin";
  links = [];
  leftMenuLinks = {
    admin: [
      {
        title: "Allocations",
        url: "/admin/allocations",
        image: "assets/images/dashboard.png",
      },
      {
        title: "Bookmarks",
        url: "/admin/bookmarks",
        image: "assets/images/bookmarks.png",
      },
      // {
      //   title: 'Quick Notes',
      //   url: '/admin/quick-notes',
      //   image: 'assets/images/quick-notes.png'
      // },
      {
        title: "Projects",
        url: "/admin/projects",
        image: "assets/images/projects.png",
      },
      {
        title: "Technologies",
        url: "/admin/technologies",
        image: "assets/images/technologies.png",
      },
      {
        title: "Create User",
        url: "/admin/register",
        image: "assets/images/users.png",
      },
    ],
    dashboard: [
      {
        title: "Dashboard",
        url: "/dashboard",
        image: "assets/images/dashboard.png",
      },
      {
        title: "Bookmarks",
        url: "/dashboard/bookmarks",
        image: "assets/images/bookmarks.png",
      },
      // {
      //   title: 'Quick Notes',
      //   url: '/dashboard/quick-notes',
      //   image: 'assets/images/quick-notes.png'
      // },
      // {
      //   title: 'Knowledge Base',
      //   url: '/dashboard/knowledge-base',
      //   image: 'assets/images/knowledge-base.png'
      // },
      {
        title: "Learning",
        url: "/dashboard/learning",
        image: "assets/images/learning1.png",
      },
      // {
      //   title: "Settings",
      //   url: "/admin/projects",
      //   image: "assets/images/users.png",
      // },
      // {
      //   title: 'Lint Rules',
      //   url: '/dashboard/lint-rules',
      //   image: 'assets/images/lint-rules.png'
      // },
    ],
  };

  isMenuCollapsed: Boolean = true;
  constructor(private route: Router) {}

  ngOnInit() {
    this.URL = this.route.url;
    this.isMenuCollapsed = localStorage.getItem("menu-collapsed") !== "0";
    this.resizeLeftPanel();
    this.links = this.leftMenuLinks[this.linktype];
  }

  resizeLeftPanel() {
    let leftPanel = document.getElementById("left-menu");
    let appHeader = document.getElementById("app-header");
    let contentBox = document.getElementById("content-box");
    let rightBox = document.getElementById("div-right");

    rightBox.style.marginLeft = (this.isMenuCollapsed ? 75 : 195) + "px";
    contentBox.style.height =
      window.innerHeight - appHeader.clientHeight + "px";
    leftPanel.style.height = window.innerHeight - appHeader.clientHeight + "px";
  }

  toggleMenuSize($event) {
    $event && $event.preventDefault();
    this.isMenuCollapsed = !this.isMenuCollapsed;
    localStorage.setItem("menu-collapsed", this.isMenuCollapsed ? "1" : "0");
    this.resizeLeftPanel();
  }
}
