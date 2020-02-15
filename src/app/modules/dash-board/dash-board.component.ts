import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { AuthService } from "../../core/auth.service";
import { SubscriptionService } from "../../core/subscription.service";
import { ThrowStmt } from "@angular/compiler";
@Component({
  selector: "app-dash-board",
  templateUrl: "./dash-board.component.html",
  styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
  data: any = {};
  arr: any = [];
  servicesArr: any = [];
  servicesArrInt: any = [];
  messagesArr: any = [];
  messagesArrInt: any = [];
  subscription: any;

  // status: boolean;
  public currentUser = localStorage.getItem("currentUser");
  constructor(
    private apollo: ApolloService,
    private auth: AuthService,
    public sub: SubscriptionService
  ) {}

  ngOnInit() {
    this.apollo.getUserWithBlocks(13).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    /**
     *
     *
     * Above this is just a test
     *
     */
    if (this.sub.sub === undefined) {
      this.sub.status = false;
    } else {
      this.subscription = this.sub.sub; // the subscription that was selected in the subscription component
      // this.getServicesArr(this.subscription.name);

      // this.servicesArr = this.sub.subService;
    }

    this.apollo.getUserWithBlocks(parseInt(this.currentUser)).subscribe(
      res => {
        //only user with the subscription can loged in so its even for the admin with subscription
        console.log(res.data.subscription);
        console.log(res.data);
        this.data = res.data;
        this.arr = this.data.subscription;

        // this.getServicesArrInt(this.arr[0].name);
      },
      err => {
        console.log(err);
      }
    );
  }
  // getServicesArrInt(subName) {
  //   this.apollo.getSubscription(subName).subscribe(
  //     res => {
  //       console.log(this.sub.status, "im here and here ");

  //       this.servicesArrInt = res.data.oneSubscription.service;
  //       this.messagesArrInt = res.data.oneSubscription.userMesg;
  //       console.log(this.servicesArrInt);
  //       console.log(res.data.oneSubscription);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  // getServicesArr(subName) {
  //   this.apollo.getSubscription(subName).subscribe(
  //     res => {
  //       this.servicesArr = res.data.oneSubscription.service;
  //       this.messagesArr = res.data.oneSubscription.userMesg;
  //       console.log(this.servicesArr);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
}
