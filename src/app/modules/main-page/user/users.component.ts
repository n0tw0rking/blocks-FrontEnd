import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
users = [
  {email:"one@one.com", userSubscription: [{name:'fathi1',balance:-200,user:'username1',block:'block1'}] ,  adminBlock:'admin1'},
  {email:"tow@tow.com", userSubscription: [{name:'hasan2',balance:100,user:'username2',block:'block2'}] ,  adminBlock:'admin2'}

]
  constructor( private router: Router, private route: ActivatedRoute) { }
id='';
sub:any;
ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
      // this.id = params+'';
    //  this.getBlock(this.id)
    console.log(params)
    })
 }
  // onSelect(use) {
  //   console.log(use)

  // }
  userMoreInfo(use){
    console.log(use)
    //redirect to new page that have rteh user record
    this.router.navigate(["/user/balance", use.email]);
      // Get http record

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
