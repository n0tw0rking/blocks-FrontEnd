import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  getUsers() {
    return this.http
      .get(
        "http://localhost:8000/api/user"
        // ,
        //  {
        //   headers: new HttpHeaders({
        //     auth:
        //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTIwYTY4YTgyNWEyYzAzZjRhYmI5OWQiLCJpYXQiOjE1NzkzNTc5NTV9.hQrqmdssy7KN0FfJ8HjJp6IZd72xyPY-z9ai0v78m6U"
        //   })
        // }
      )
      .subscribe(data => console.log(data));
    // return this.apollo
    //   .watchQuery<any>({
    //     query: gql`
    //       query($email: String!, $password: String!) {
    //         login(userInput: { email: $email, password: $password }) {
    //           token
    //           userId
    //           isAdmin
    //           isSuperAdmin
    //         }
    //       }
    //     `,
    //     variables: {
    //       email: "faredmohamed",
    //       password: "123456"
    //     },
    //     errorPolicy: "all"

    //   })
    //   .valueChanges.subscribe(
    //     result => {
    //       console.log(result.data);
    //       console.log(result.errors);
    //     },
    //     err => {
    //       console.log(err.graphQLErrors);
    //     }
    //   );
  }

  postBlock(Block) {
    console.log('getuser triggerde',Block)
    return this.http.post("http://localhost:3000/api/", Block)
    .subscribe(data =>console.log(data))}
}
