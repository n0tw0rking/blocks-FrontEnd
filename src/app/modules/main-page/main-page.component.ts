import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
declare var $: any;
import { ApolloService } from "../../core/apollo.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  snapshot;
<<<<<<< HEAD
  messsages:any;
=======
  messsages: any;
>>>>>>> 36715d8a731e273effb12427c127801fd0ee7067
  constructor(
    public router: Router,
    private apollo: ApolloService,
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
<<<<<<< HEAD
    let to:string;
    this.apollo.getMessageASP()
    .subscribe(res =>
      // to = res.data.usersWithMessages.email)
      // console.log(res.data.usersWithMessages))
       this.messsages= res.data.usersWithMessages)

    // this.apollo
    //   .watchQuery<any>({
    //     query: gql`
    //       query {
    //         oneUser {
    //           _id
    //         }
    //       }
    //     `,
    //     errorPolicy: "all"
    //   })
    //   .valueChanges.subscribe(result => {
    //     console.log(result);
    //   });
    // // if (this.router.url === "/") {
    // //   this.router.navigate(["/"]);
    // // }
    // this.handleLayout();
    // this.snapshot = this.router.routerState.snapshot;
=======
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
>>>>>>> 36715d8a731e273effb12427c127801fd0ee7067
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
