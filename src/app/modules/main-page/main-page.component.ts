import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
declare var $: any;
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  constructor(public router: Router, private apollo: Apollo) {}

  public config: PerfectScrollbarConfigInterface = {};

  topOffset = 55;
  height: any;

  public innerWidth: any;
  public innerHeight: any;
  public lockSidebar = false;
  public showMobileMenu = false;
  public addMiniSidebar = false;
  public hideLogoText = false;

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            oneUser {
              _id
            }
          }
        `,
        errorPolicy: "all"
      })
      .valueChanges.subscribe(result => {
        console.log(result);
      });
    if (this.router.url === "/") {
      this.router.navigate(["/home"]);
    }
    this.handleLayout();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.handleLayout();
  }

  toggleSidebar() {
    this.showMobileMenu = true;
  }

  handleLayout() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.addMiniSidebar = true;
      this.hideLogoText = true;
    } else {
      this.addMiniSidebar = false;
      this.hideLogoText = false;
    }
    this.innerHeight = window.innerHeight;
    this.height = this.innerHeight - this.topOffset;
    if (this.height < 1) {
      this.height = 1;
    }
    if (this.height > this.topOffset) {
      this.height = this.height + "px";
    }
  }
}
