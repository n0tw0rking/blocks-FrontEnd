import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ApolloService } from "../../core/apollo.service";
import { HttpService } from "../../core/http.service";
import { SwUpdate, SwPush } from "@angular/service-worker";
declare var $: any;
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  snapshot;
  messsages: any;
  loading = true;
  readonly VAPID_KEY =
    "BIDKneMUisz3eBe-_YA5eA3qm_JAPv6Uz79IIWppgjakBOjpUQYK3E6BbBfcvQaGhKsnodIJ04VYrrvpv256erY";
  constructor(
    public router: Router,
    private apollo: ApolloService,
    private SwUpdate: SwUpdate,
    private SwPush: SwPush,
    private http: HttpService,
    // private actRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

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
    // let to:string;
    // this.apollo.getMessageASP()
    // .subscribe(res =>
    //   // to = res.data.usersWithMessages.email)
    //   // console.log(res.data.usersWithMessages))
    //    this.messsages= res.data.usersWithMessages)
    // // this.apollo
    // //   .watchQuery<any>({
    // //     query: gql`
    // //       query {
    // //         oneUser {
    // //           _id
    // //         }
    // //       }
    // //     `,
    // //     errorPolicy: "all"
    // //   })
    // //   .valueChanges.subscribe(result => {
    // //     console.log(result);
    // //   });
    // // // if (this.router.url === "/") {
    // // //   this.router.navigate(["/"]);
    // // // }
    // // this.handleLayout();
    // // this.snapshot = this.router.routerState.snapshot;
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
  subscribeToNotification() {
    if (this.SwUpdate.isEnabled) {
      this.SwPush.requestSubscription({
        serverPublicKey: this.VAPID_KEY
      }).then(sub => {
        console.log(sub);
        this.http.postSomething(sub).subscribe(res => {
          console.log(res);
        });
      });
    }
  }
}
