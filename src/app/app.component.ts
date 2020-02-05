import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./core/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angular";
  toggle = true;

  constructor(private router: Router, private auth: AuthService) {}
  //constructor(private _http: HttpService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("currentUser")) {
      this.auth.isAuthSuperAndAdmin().subscribe(
        res => {
          const data = { ...res.data.isSuperIsAdmin };
          this.auth.isAdmin = data.isAdmin;
          this.auth.isSuperAdmin = data.isSuperAdmin;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    }

    let signInData = localStorage.getItem("token");

    if (!signInData) {
      console.log(signInData);
      this.router.navigate(["login"]);
    }
  }
}
