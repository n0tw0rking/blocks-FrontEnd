import { Component, OnInit, Input } from "@angular/core";
import { ApolloService } from "../../../core/apollo.service";
import { retry } from "rxjs/operators";
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
  @Input() updParent: any;
  ngOnInit() {
    console.log("the service", this.service);
  }
  updateService(serviceid, state) {
    console.log(serviceid, state);
    if (!this.checkService(serviceid, state)) {
      console.log("entering");
      this.apollo.updateServiceById(serviceid, state).subscribe(
        result => {
          if (result.errors) {
            this.loading = false;
            console.log(result.errors[0].message);
          } else {
            console.log(result);
            this.service.aServiceId = !state;
            this.loading = result.data.loading;
          }
        },
        errorResponse => {
          console.log(errorResponse);
        }
      );
    }
    this.updParent(serviceid);
  }
  checkService(serviceid, state) {
    this.apollo.getServiceById(serviceid).subscribe(
      result => {
        if (result.errors) {
          return false;
        } else {
          // this.service = result.data.services;
          console.log(result);
          if (result.data.service.isActive === state) {
            return true;
          }
        }
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
    return false;
  }
}
