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

  getService(): any {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($name: String!) {
          oneService(name: $name) {
            _id
            subscriptionId {
              _id
            }
          }
        }
      `,
      variables: {
        name: "water"
      },
      errorPolicy: "all"
    }).valueChanges;
  }
//works
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
      .valueChanges
   }


   createUser(user){ 
     console.log(user)
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
     .valueChanges
   }

   getBlock(id){ //get all info of block by id 

   }
 
   getBlocks(){ //get all blocks id s and name s
 
   }
 
   getUsersOfBlock(id) { //get all user s inside this block(id)
 
   }
 
 
 //works
   createNewBlock(Block) {
      console.log(Block, 'inside newblock')
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation($name:String!, $location:String!) {
        createBlock(blockInput:{name:$name,location:$location}){
          _id
          name
          location
        }
      }
      `,
      variables: {
        name: Block.name,
        location: Block.location

      },
      errorPolicy: "all"
    })


   }

 

  getSubscription(): any {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($name: String!) {
          oneSubscription(name: $name) {
            _id

            block {
              _id
            }
          }
        }
      `,
      variables: {
        name: "BBB"
      },
      errorPolicy: "all"
    }).valueChanges;
  }
}
