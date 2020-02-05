import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
     .watchQuery<any>({
         query: gql`
          query {
            oneUser {
              _id
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
