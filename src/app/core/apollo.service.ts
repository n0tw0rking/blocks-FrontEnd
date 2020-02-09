import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class ApolloService {
  constructor(private apollo: Apollo) {}

  getUser(currentUser): any {
    console.log("currnentUser : ", currentUser);
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query {
          user(userId: ) {
            email
            phoneNumber
            blockUsers {
              blockId
            }
            subscriptions {
              subscriptionId
              subscriptionName
              user {
                userId
              }
            }
          }
        }
      `,
      // I NEEED TO UNCOMMENT THIS LATER these are the varible to send the query
      // variables: {
      //   userId: currentUser
      // },
      errorPolicy: "all"
    }).valueChanges;
  }
  getAllServices(): any {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        {
          services {
            serviceName
            serviceName
            isActive
          }
        }
      `,
      errorPolicy: "all"
    }).valueChanges;
  }
  getService(): any {
    return this.apollo.use("ASP").watchQuery<any>({
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

  getSubscription(): any {
    return this.apollo.use("ASP").watchQuery<any>({
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
