import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-balance-edit",
  templateUrl: "./balance-edit.component.html",
  styleUrls: ["./balance-edit.component.css"]
})
export class BalanceEditComponent implements OnInit {
  users = [{
    id: 18,
    username: "John",
    sub: "water Fall"
  }, {
    id: 13,
    username: "Ahmed",
    sub: "Monthly Maintance"
  }, {
    id: 18,
    username: "Adam",
    sub: "Elavator"
  }]
    ;
  sub: any;
  email: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params.id;
      console.log(params);
    });
  }
}
