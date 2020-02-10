import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
@Component({
  selector: "app-services-page",
  templateUrl: "./services-page.component.html",
  styleUrls: ["./services-page.component.css"]
})
export class ServicesPageComponent implements OnInit {
  services = [];
  loading = true;
  constructor(private appollo: ApolloService) {}

  ngOnInit() {
    // UNCOMMENT THIS LATER ADAM
    this.appollo.getAllServices().subscribe(
      result => {
        if (result.errors) {
          console.log(result.errors[0].message);
        } else {
          this.loading = result.data.loading;
          this.services = result.data.services;
          console.log(result);
        }
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  }
}
