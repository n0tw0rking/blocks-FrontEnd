<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-balance-edit',
  templateUrl: './balance-edit.component.html',
  styleUrls: ['./balance-edit.component.css']
})
export class BalanceEditComponent implements OnInit {
sub:any;
email:string;
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
     this.email = params.id
    console.log(params)
    })
  }

=======
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-balance-edit",
  templateUrl: "./balance-edit.component.html",
  styleUrls: ["./balance-edit.component.css"]
})
export class BalanceEditComponent implements OnInit {
  users;
  sub: any;
  email: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params.id;
      console.log(params);
    });
  }
>>>>>>> 36715d8a731e273effb12427c127801fd0ee7067
}
