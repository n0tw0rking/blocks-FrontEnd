import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloService } from '../../../core/apollo.service'
// import { Apollo } from 'apollo-angular';


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
  constructor( private router: Router, private route: ActivatedRoute, private polo: ApolloService) { }
id='5e3454731487322a3813c2ee';
sub:any;
val:any;
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
    //redirect to new page that have the user record
    this.router.navigate(["/user/balance", use.email]);
      // Get http record
    //  this.polo.getUser(this.id).subscribe(result => {
    //   console.log(result.data);
    // });
    console.log(this.val)
      // this.polo.getsUser

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
