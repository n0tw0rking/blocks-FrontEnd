import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class ApolloService {
  constructor(private apollo: Apollo) {}


  getUser(currentUser): any {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($id: String!) {
          oneUser(id: $id) {
            _id
            isAdmin
            isSuperAdmin
            email
            password
            userSubscription {
              _id
              name
              user {
                _id
              }
              block {
                _id
                name
                location
              }
            }
          }
        }
      `,
      variables: {
        id: currentUser
      },
      errorPolicy: "all"
    }).valueChanges
  }


  getsUser(id){
    return this.apollo
     .watchQuery<any>({
         query: gql`
         query{
           oneUser(id:${id}){
             _id
             isAdmin
             isSuperAdmin
             email
             password
             userSubscription{
               _id
               user{
                 _id
               }
               block{
                 _id
                 name
                 location
               }
             }
           }
         }
        `,
        errorPolicy: "all"
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        return result
      });
 
   }

   createUser(){
    return this.apollo
    .watchQuery<any>({
        query: gql`
        mutation{
          createUser(userInput:{email:"user1",password:"user1",isAdmin:false}){
            _id
            email
            password
            isAdmin
          }
        }
       `,
       errorPolicy: "all"
     })
     .valueChanges.subscribe(result => {
       console.log(result);
     });
   }

   getBlock(id){ //get all info of block by id 

   }
 
   getBlocks(){ //get all blocks id s and name s
 
   }
 
   getUsersOfBlock(id) { //get all user s inside this block(id)
 
   }
 
 
 
   createNewBlock(Block) {
      console.log(Block)
    return this.apollo.watchQuery<any>({
      query: gql`
      mutation{
        createBlock(blockInput:{name:$name,location:$location){
          _id
          name
        }
      }
      `,
      variables: {
        name: Block.name,
        location: Block.location

      },
      errorPolicy: "all"
    }).valueChanges


   }

 


}