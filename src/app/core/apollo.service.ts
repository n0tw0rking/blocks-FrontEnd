import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class ApolloService {
  constructor(private apollo: Apollo) {}

  getUser(): any {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($userId: String!) {
          user(userId: $userId) {
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
      // I NEED TO UNCOMMENT THIS LATER these are the varible to send the query
      variables: {
        userId: localStorage.getItem("currnetUser")
      },
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

  getSubscriptionBYName(subName): any {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($aServiceName: String!) {
          serviceByName(aServiceName: $aServiceName) {
            aServiceId
            serviceName
            isActive
          }
        }
      `,
      variables: {
        aServiceName: subName
      },
      errorPolicy: "all"
    }).valueChanges;
  }
}
