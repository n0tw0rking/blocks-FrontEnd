import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-services-page",
  templateUrl: "./services-page.component.html",
  styleUrls: ["./services-page.component.css"]
})
export class ServicesPageComponent implements OnInit {
  services = [];
  blocks = [];
  loading = true;
  blockId;
  data = null;
  error = "";
  constructor(
    private appollo: ApolloService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {



    const currentUser = //parseInt(localStorage.getItem("currentUser")) ||
      13;
    this.appollo.getUserWithBlocks(13).subscribe(
      response => {
        console.log(response)
        this.blocks = response.data.subscription.map(sub => {
          return sub.blockSubscriptions[0]
        });
        console.log("here ", this.blocks)
        this.blockId = this.blocks[0].block.blockId
        console.log(this.blockId)
        this.appollo.getServicesByBlockId(this.blockId).subscribe(
          result => {

            /////////
            // this.appollo.getServicesByBlockId(1).subscribe(
            //   result => {
            //     if (result.errors) {
            //       this.loading = false;
            //       console.log(result.errors[0].message);
            //       /*NOTE: This folliwing part is for error handlings checking the Error to display ..
            //     "This block has 0 service"
            //     */
            //       this.error =
            //         result.errors[0].message === "Unexpected Execution Error" ||
            //           "Variable`blockId` of type`Int!` must not be null."
            //           ? "This block has 0 service "
            //           : result.errors[0].message;
            result.data.blockServices.blockSubscriptions.forEach(obj => {
              obj.subscription.aServiceSubscriptions.forEach(obj => {
                this.services.push(obj.service);
              });
            });
            this.error = !this.services.length
              ? "This block has 0 service "
              : null;
            this.loading = result.data.loading;
          },
          errorResponse => {
            console.log(errorResponse);
          }
        );
      }
    );

  }

  updateParent($event) {
    this.services[$event].isActive = !this.services[$event].isActive;
  }
}
