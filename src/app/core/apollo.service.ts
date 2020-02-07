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
    }).valueChanges;
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
      });
 
   }
 


}