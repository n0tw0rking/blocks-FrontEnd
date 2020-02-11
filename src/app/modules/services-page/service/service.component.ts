import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit
} from "@angular/core";
import { ApolloService } from "../../../core/apollo.service";
import { retry } from "rxjs/operators";
import { Router } from "@angular/router";
@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.css"]
})
export class ServiceComponent implements AfterViewInit {
  loading = false;
  error;
  constructor(private apollo: ApolloService, private _router: Router) {}
  @Input() service: any;
  @Input() index: any;

  @Input() updParent: any;
  @Input() blockId: Number;
  @Output() ServciceEvent: EventEmitter<any> = new EventEmitter<any>();
  // @Output() close: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit() {}
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
            this.loading = result.data.loading;
            this.ServciceEvent.emit(this.index);
          }
        },
        errorResponse => {
          console.log(errorResponse);
        }
      );
    }
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
  updateServices($) {}
}
