import { Component, OnInit, Input } from "@angular/core";
import { ApolloService } from "../../../core/apollo.service";
@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.css"]
})
export class ServiceComponent implements OnInit {
  loading = false;
  error;
  constructor(private apollo: ApolloService) {}
  @Input() service: any;

  ngOnInit() {
    console.log(this.service);
  }
  updateService(serviceid, state) {
    console.log(serviceid, state);
    this.apollo.updateServiceById(serviceid, state).subscribe(
      result => {
        if (result.errors) {
          this.loading = false;
          console.log(result.errors[0].message);
        } else {
          // this.service = result.data.services;
          console.log(result);
          this.loading = result.data.loading;
        }
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  }
}
