import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApolloService } from "../../../core/apollo.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit, OnDestroy {
  users = []
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: ApolloService
  ) {}
  id = "";
  sub: any;
  userId:any;
  userIds:Number[]
  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      // this.id = params+'';
      //  this.getBlock(this.id)
      if(params.id){
        // call users in selected blockId passed by params
        console.log(params, 'this is blockId');
        this.apollo.getUsersOfBlock(params.id)
        .subscribe(res =>
            res.data.block.blockSubscriptions.forEach(element => {
              this.users.push(element)
              console.log(element)
            })
          
          )
      }
      else {
          //call all users by admin id
       console.log('ther ia no params')
       this.userId= localStorage.getItem("currentUser")

        this.apollo.getBlocksByAdminId(this.userId)
       .subscribe(res=> 
      // this.blocks= res.data.blocks
      // console.log(res.data.blocks )
      res.data.blocks.forEach(element => {
        // console.log(element.blockId)
        if(element.blockId != undefined){
          this.userIds.push(element.blockId)
          console.log(element.userId)
        }
      })
      )
      //   this.apollo.getUser()
      //   .subscribe(res => console.log(res))
      }

    })
  }
  // onSelect(use) {
  //   console.log(use)

  // }
  userMoreInfo(use) {
    /*
    NOTES:
    I have add the service to get user from the backend
    */
    // ADAM

    console.log(use);
    //redirect to new page that have the user record
    this.router.navigate(["/user/balance", use.email]);
    // Get http record
    this.apollo.getUser().subscribe(
      result => {
        if (result.errors) {
          console.log(result.errors[0].message);
        } else {
          this.users = result.data.services;
          console.log(result);
        }
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
    // this.polo.getsUser
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
