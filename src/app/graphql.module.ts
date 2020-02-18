import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS, Apollo } from "apollo-angular";
import { HttpClientModule } from "@angular/common/http";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
const token = localStorage.getItem("token");

const basic = setContext((operation, context) => ({
  headers: {
    Accept: "charset=utf-8"
  },
  method: "GET"
}));
const auth = setContext((operation, context) => ({
  headers: {
    Authorization: `Bearer ${token}` || ""
  }
}));
/*
 IMPORTANT NOTE :
 TOKEN INTERCEPTOR IS TAKING CARE OF THE TOKEN INJECTION.
*/
@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule]
})
export class GraphQLModule {
  private uri2 = "https://hotgraphapi20200206111431.azurewebsites.net";
  // private uri1 = "https://blocks-backend.herokuapp.com/graphql";
  private uri1 = "http://localhost:4000/graphql";

  constructor(public apollo: Apollo, public httpLink: HttpLink) {
    const options1: any = {
      uri: this.uri1
    };

    this.apollo.createDefault({
      link: ApolloLink.from([auth, basic, this.httpLink.create(options1)]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: "all"
        }
      }
    });

    const options2: any = { uri: this.uri2 };
    this.apollo.createNamed("ASP", {
      link: ApolloLink.from([auth, this.httpLink.create(options2)]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: "all"
        }
      }
    });
    this.apollo.createNamed("mute", {
      link: ApolloLink.from([auth, this.httpLink.create(options1)]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: "all"
        }
      }
    });
  }
}
