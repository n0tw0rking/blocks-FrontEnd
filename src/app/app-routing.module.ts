import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./modules/main-page/user/users.component";
import { LoginComponent } from "./modules/login/login.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { ServicesPageComponent } from "./modules/services-page/services-page.component";
import { AuthGuard } from "./core/auth.guard";
import { SuperAdminComponent } from "./modules/super-admin/super-admin.component";
import { BalanceEditComponent } from "./modules/main-page/user/balance-edit/balance-edit.component";
import { ErrorPageComponent } from "./modules/error-page/error-page.component";
import { DashBoardComponent } from './modules/dash-board/dash-board.component';

const routes: Routes = [
  { path: "", component: MainPageComponent, canActivate: [AuthGuard] },
  {
    path: "super",
    component: SuperAdminComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  // { path:'user', component: UserComponent,  canActivate:[AuthGuard] ,
  {
    path: "user/balance/:id",
    component: BalanceEditComponent,
    canActivate: [AuthGuard]
  },
  { path: "user/:id", component: UsersComponent },

  {
    path: "user",
    component: UsersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: UsersComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: "services",
    component: ServicesPageComponent,
    canActivate: [AuthGuard]
  },
  /**
   * 
   *   NOTES FROM ADAM:
I have added the name so I can search by name
   */
  {
    path: "services/:id",
    component: ServicesPageComponent,
    canActivate: [AuthGuard]
    // canActivate: [AuthGuard]
  },
  {path:'dashboard', component:DashBoardComponent},
  // { path: "blocks", component: BlocksPageComponent },
  { path: "dash", component: DashBoardComponent, canActivate: [AuthGuard] },
  {
    path: "subscription",
    component: SubscriptionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" }
  },
  { path: "**", redirectTo: "/not-found" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
