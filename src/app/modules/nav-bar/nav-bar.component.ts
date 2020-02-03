import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { from } from "rxjs";
import { Location } from "@angular/common";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  @ViewChild("toggleNavBar", { static: false })
  toggleNavBar: ElementRef;
  private toggleButton: any;
  private sidebarVisible: boolean;
  constructor(
    public auth: AuthService,
    public location: Location,
    private element: ElementRef
  ) {}

  ngOnInit() {}
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName("body")[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  ngAfterViewInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    console.log(html);
    console.log(toggleButton, "toggle");

    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    // console.log(html);
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "/home") {
      return true;
    } else {
      return false;
    }
  }
  isLogin() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "/login") {
      return true;
    } else {
      return false;
    }
  }
  onLogout() {
    this.auth.logout();
  }
}