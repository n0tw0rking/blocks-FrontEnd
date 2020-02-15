import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SwUpdate, SwPush } from "@angular/service-worker";
import { HttpService } from "../../core/http.service";
import { ApolloService } from "../../core/apollo.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = "";
  loading = true;
  submitted = false;
  notifyMessage = "";
  public currentUser;
  readonly VAPID_KEY =
    "BIDKneMUisz3eBe-_YA5eA3qm_JAPv6Uz79IIWppgjakBOjpUQYK3E6BbBfcvQaGhKsnodIJ04VYrrvpv256erY";
  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private SwUpdate: SwUpdate,
    private SwPush: SwPush,
    private http: HttpService,
    private apollo: ApolloService
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.createForm();
    this.route.params.subscribe(params => {
      if (params.registered === "success") {
        this.notifyMessage =
          "You have been successfully registered, you can log in now";
      }
    });
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }
  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    if (this.isInvalidForm("email")) {
      return (this.errors =
        this.loginForm.controls["email"].status === "INVALID"
          ? "Invalid Email"
          : "");
    }
    this.submitted = true;
    this.auth.login(this.loginForm.value).subscribe(
      token => {
        this.loading = token.loading;
        if (token.errors) {
          this.submitted = false;
          console.log(token.errors[0].message);
        } else {
          console.log("this is the user");
          this.currentUser = localStorage.getItem("currentUser");
          console.log(typeof parseInt(this.currentUser));
          this.apollo.getUserWithBlocks(parseInt(this.currentUser)).subscribe(
            res => {
              //only user with the subscription can loged in so its even for the admin with subscription
              // console.log(res.data.oneUser.userSubscription);
              console.log(res, "PPPPPPPPP");
              if (res.data.subscription.length === 0) {
                console.log("&&&&&&&&&&&&&&");
                this.auth.logout();
              } else {
                console.log(res.data);
                this.subscribeToNotification();
                this.router.navigate(["/dash"]);
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      errorResponse => {
        this.submitted = false;
        console.log("error on the login", errorResponse);
        this.errors = errorResponse.error;
      }
    );
  }
  subscribeToNotification() {
    if (this.SwUpdate.isEnabled) {
      this.SwPush.requestSubscription({
        serverPublicKey: this.VAPID_KEY
      }).then(sub => {
        console.log(sub);
        this.http.postSomething(sub).subscribe(res => {
          console.log(res);
        });
      });
    }
  }
}
