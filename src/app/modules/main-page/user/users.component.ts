import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users = [
  {email:"one@one.com", userSubscription: [{name:'fathi1',balance:-200,user:'username1',block:'block1'}] ,  adminBlock:'admin1'},
  {email:"tow@tow.com", userSubscription: [{name:'hasan2',balance:100,user:'username2',block:'block2'}] ,  adminBlock:'admin2'}

]
  constructor( private router: Router) { }

  ngOnInit() {
  }
  // onSelect(use) {
  //   console.log(use)

  // }
  userMoreInfo(use){
    console.log(use)
    //redirect to new page that have rteh user record
    this.router.navigate(["/user/balance"]);
      // Get http record

  }

}
