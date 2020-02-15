import { Router } from "@angular/router";
import { AuthService } from "./core/auth.service";
import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angular";
  toggle = true;
  showMobileMenu = false;
  constructor(
    private router: Router,
    private auth: AuthService,
    updates: SwUpdate,
    @Inject(DOCUMENT) private document: Document
  ) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
  public config: PerfectScrollbarConfigInterface = {};

  topOffset = 55;
  height: any;

  public innerWidth: any;
  public innerHeight: any;
  public lockSidebar = false;
  public addMiniSidebar = false;
  public hideLogoText = false;
  public hidesearchBar = false;

  //constructor(private _http: HttpService, private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem("currentUser")) {
      this.auth.isAuthSuperAndAdmin().subscribe(
        res => {
          const data = { ...res.data.isSuperIsAdmin };
          this.auth.isAdmin = data.isAdmin;
          this.auth.isSuperAdmin = data.isSuperAdmin;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    }
    let signInData = localStorage.getItem("token");
    if (!signInData) {
      console.log(signInData);
      this.router.navigate([
        "login"
        // "/main"
      ]);
    }
  }
  toggleSidebar() {
    this.showMobileMenu = true;
  }

  // Fucntion that checks if the location router on the window is /main
  isMain() {
    if (this.router.url == "/main") {
      return true;
    }
    console.log(this.router.url);
    return false;
  }

  isLogin() {
    if (this.router.url == "/login") {
      return true;
    }
    return false;
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
    if (this.innerWidth < 800) {
      this.hidesearchBar = true;
    } else {
      this.hidesearchBar = false;
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
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.handleLayout();
  }
}
