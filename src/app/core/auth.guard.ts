import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  private url: string;
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(state.url);

    if (state.url === "/super") {
      // console.log(this.auth.isAuthed, "this.auth.isAuthed");
      // console.log(this.auth.isSuperAdmin, "this.auth.isSuperAdmin");
      console.log(this.auth.isAuthed && this.auth.isSuperAdmin, "ISSUPERADMIN");
      return this.auth.isAuthed && this.auth.isSuperAdmin;
    } else {
      if (this.auth.isAuthed) {
        console.log(state.url, "######");
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    }
  }
}
//   private handleAuthState(): boolean {
//     if (this.isLoginOrRegister()) {
//       this.router.navigate(["/"]);
//       return false;
//     }
//     return true;
//   }
//   private handleNotAuthState(): boolean {
//     if (this.isLoginOrRegister()) {
//       return true;
//     }
//     this.router.navigate(["/login"]);
//     return false;
//   }

//   private isLoginOrRegister(): boolean {
//     // if (this.url.includes("login") || this.url.includes("register")) {
//     if (this.url.includes("login")) {
//       return true;
//     }
//     return false;
//   }
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     this.url = state.url;
//     console.log(this.url, state.url);
//     console.log(this.auth.isAuthed);
//     if (this.auth.isAuthed) {
//       console.log("im here");
//       return this.handleAuthState();
//     }
//     return this.handleNotAuthState();
//   }
// }
