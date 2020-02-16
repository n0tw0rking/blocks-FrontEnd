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
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    console.log(currentUser)
    this.appollo.getUserWithBlocks(currentUser).subscribe(
      response => {
        this.blocks = response.data.subscription.map(sub => {
          return sub.blockSubscriptions[0]
        });
        this.blockId = this.blocks[0].block.blockId
        console.log(this.blockId)
        this.appollo.getServicesByBlockId(this.blockId).subscribe(
          result => {
            this.services = []
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
            this.error = errorResponse
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
