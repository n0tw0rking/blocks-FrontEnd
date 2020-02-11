import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-services-page",
  templateUrl: "./services-page.component.html",
  styleUrls: ["./services-page.component.css"]
})
export class ServicesPageComponent implements OnInit {
  services = [];
  blockId;
  loading = true;
  error = "";
  constructor(private appollo: ApolloService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blockId = parseInt(params.id);
      console.log(this.blockId);
    });
    if (
      this.blockId !== undefined ||
      this.blockId !== null ||
      this.blockId !== "NaN"
    ) {
      this.appollo.getServicesByBlockId(this.blockId).subscribe(
        result => {
          if (result.errors) {
            this.loading = false;
            console.log(result.errors[0].message);
            this.error =
              result.errors[0].message === "Unexpected Execution Error"
                ? "This block has 0 service "
                : result.errors[0].message;
          } else {
            result.data.blockServices.blockSubscriptions.forEach(obj => {
              obj.subscription.aServiceSubscriptions.forEach(obj => {
                this.services.push(obj.service);
              });
            });
            this.error = !this.services.length
              ? "This block has 0 service "
              : null;
            this.loading = result.data.loading;
            // this.services =
            //   result.data.blockServices.blockSubscriptions.subscription.aServiceSubscriptions;
          }
        },
        errorResponse => {
          console.log(errorResponse);
        }
      );
    } else {
      this.appollo.getAllServices().subscribe(
        result => {
          if (result.errors) {
            this.loading = result.data.loading;
            console.log(result.errors[0].message);
          } else {
            this.services = result.data.services;
            console.log(this.services);
            this.loading = result.data.loading;
          }
        },
        errorResponse => {
          console.log(errorResponse);
        }
      );
    }
  }
}
