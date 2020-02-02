import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
const $ = require("jquery");
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  focusEmail;
  focusPass;
  loginForm: FormGroup;
  errors: any = [];
  notifyMessage = "";

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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

  async login() {
    if (this.isInvalidForm("email") || this.isInvalidForm("password")) {
      return;
    }
    console.log(this.loginForm.value);
    await this.auth.login(this.loginForm.value).subscribe(result => {
      if (result.errors) {
        return (this.errors = result.errors[0]);
      }
      console.log("login func in login component");
      this.router.navigate(["/"]);
      // },
      // NOTE:
      // THE RESPONSE FORM THE SERVER DOES NOT HAVE AN ERROR ATTR
      // errorResponse => {
      //   console.log(errorResponse);
      //   this.errors = errorResponse.error.errors[0];
    });
  }
}
