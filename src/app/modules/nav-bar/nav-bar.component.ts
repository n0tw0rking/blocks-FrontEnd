import { Component, OnInit, ElementRef } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { from } from "rxjs";
import { Location } from "@angular/common";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  titlee;
  constructor(
    public auth: AuthService,
    public location: Location,
    private element: ElementRef
  ) {}

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
  }
  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

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
    this.titlee = this.location.prepareExternalUrl(this.location.path());
    if (this.titlee === "/home") {
      return true;
    } else {
      return false;
    }
  }
  isLogin() {
    this.titlee = this.location.prepareExternalUrl(this.location.path());
    if (this.titlee === "/login") {
      return true;
    } else {
      return false;
    }
  }
  onLogout() {
    this.auth.logout();
  }
}
