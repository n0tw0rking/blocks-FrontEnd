import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `${
      // TODO:
      // Refactor this to be more effient and store the token in a safer place than localStorage.
      // If there is no token send empty string!!
      !localStorage.getItem("token") ? "" : localStorage.getItem("token")
    }`
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user;
  private urlLogin = "https://blocks-backend.herokuapp.com/graphql";

  public isAuthed = !!localStorage.getItem("currentUser");
  @Output() getIsAuthed: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) {
    console.log(this.isAuthed);
    this.getIsAuthed.emit(this.isAuthed);
  }

  public login({ email, password }: any): Observable<any> {
    const query = `
    query{
  login(userInput:{email:"${email}", password:"${password}"}){
   token
    userId
    isAdmin
    tokenExpriration
    isSuperAdmin
  }
}`;
    console.log(query);
    return this.http.post(`${this.urlLogin}`, { query }).pipe(
      map((res: any) => {
        console.log(res);
        if (!res.errors || res.data) {
          this.user = res.data.admin;
          return this.saveTokenAndCurrentUser(res.data.token);
        }
      })
    );
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.isAuthed = false;
    this.router.navigate(["/login"]);
    this.getIsAuthed.emit(this.isAuthed);
  }

  private saveTokenAndCurrentUser(token: string): string {
    localStorage.setItem("token", token);
    console.log(this.user);
    localStorage.setItem("currentUser", JSON.stringify(this.user));
    this.isAuthenticated().subscribe(res => {
      console.log(res);
    });
    return token;
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public isAuthenticated(): any {
    return this.http
      .get(`${this.urlLogin}`, {
        headers: new HttpHeaders({ auth: localStorage.getItem("token") || "" })
      })
      .pipe(
        map((user: any) => {
          this.isAuthed =
            user._id === JSON.parse(localStorage.getItem("currentUser"))._id;
          console.log("console from ");
          this.getIsAuthed.emit(this.isAuthed);
          return this.isAuthed;
        })
      );
  }

  public getCurrentUserName(): string {
    return JSON.parse(localStorage.getItem("currentUser")).name;
  }
}
