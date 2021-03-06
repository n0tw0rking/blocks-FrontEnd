import {
  Component,
  AfterViewInit,
  EventEmitter,
  Output,
  Input
} from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { AuthService } from "../../../core/auth.service";
declare var $: any;
@Input()
@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html"
})
export class NavigationComponent implements AfterViewInit {
  tittle = "";
  hidesearchBar;
  @Output()
  toggleSidebar = new EventEmitter<void>();
  @Output()
  toggleRightSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    public location: Location,
    private router: Router
  ) {}

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: "btn-danger",
      icon: "ti-link",
      title: "Luanch Admin",
      subject: "Just see the my new admin!",
      time: "9:30 AM"
    },
    {
      btn: "btn-success",
      icon: "ti-calendar",
      title: "Event today",
      subject: "Just a reminder that you have event",
      time: "9:10 AM"
    },
    {
      btn: "btn-info",
      icon: "ti-settings",
      title: "Settings",
      subject: "You can customize this template as you want",
      time: "9:08 AM"
    },
    {
      btn: "btn-primary",
      icon: "ti-user",
      title: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM"
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: "assets/images/users/1.jpg",
      status: "online",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:30 AM"
    },
    {
      useravatar: "assets/images/users/2.jpg",
      status: "busy",
      from: "Sonu Nigam",
      subject: "I have sung a song! See you at",
      time: "9:10 AM"
    },
    {
      useravatar: "assets/images/users/2.jpg",
      status: "away",
      from: "Arijit Sinh",
      subject: "I am a singer!",
      time: "9:08 AM"
    },
    {
      useravatar: "assets/images/users/4.jpg",
      status: "offline",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM"
    }
  ];

  ngAfterViewInit() {}
  ngOnInit() {
    // this.tittle = this.location.path().slice(1);
  }
  logout() {
    this.authService.logout();
  }
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
}
