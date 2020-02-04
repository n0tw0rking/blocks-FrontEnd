import { Component } from "@angular/core";
import { Router } from "@angular/router";
// import{HttpService } from

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angular";
  toggle = true;

  constructor(private router: Router) {}
  //constructor(private _http: HttpService, private router: Router) {}

  ngOnInit() {
    let signInData = localStorage.getItem("token");

    if (!signInData) {
      console.log(signInData);
      this.router.navigate([
        // "login"
        "home"
      ]);
    }
  }
}
