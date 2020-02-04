import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
userlist = [
  {email:"one@one.com", userSubscription: [{name:'fathi1',balance:-200,user:'username1',block:'block1'}] ,  adminBlock:'admin1'},
  {email:"tow@tow.com", userSubscription: [{name:'hasan2',balance:100,user:'username2',block:'block2'}] ,  adminBlock:'admin2'}

]
  constructor() { }

  ngOnInit() {
  }

}
