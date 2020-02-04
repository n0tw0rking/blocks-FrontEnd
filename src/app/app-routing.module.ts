import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./modules/main-page/user/users.component";
import { LoginComponent } from "./modules/login/login.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { ServicesPageComponent } from "./modules/services-page/services-page.component";
import { BlocksPageComponent } from "./modules/blocks-page/blocks-page.component";
import { AuthGuard } from "./core/auth.guard";
import { BlockComponent } from "./modules/blocks-page/block/block.component";
import { SuperAdminComponent } from "./modules/super-admin/super-admin.component";
import { EditComponent } from './modules/blocks-page/edit/edit.component';
import { AddBlockComponent } from './modules/blocks-page/add-block/add-block.component';

const routes: Routes = [
  { path: "super", component: SuperAdminComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "", component: MainPageComponent, canActivate: [AuthGuard] },
  // { path:'user', component: UserComponent,  canActivate:[AuthGuard] ,
  {
    path: "user",
    component: UsersComponent,
    canActivate: [AuthGuard],

    children: [
      { path: "", component: UsersComponent },
      { path: ":id", component: UsersComponent }
    ]
  },
  {
    path: "services",
    component: ServicesPageComponent,
    canActivate: [AuthGuard]
  },
  // { path: "blocks", component: BlocksPageComponent },
  {
    path: "blocks",
    component: BlocksPageComponent,
    // canActivate: [AuthGuard],
    children: [
      {path: '', component: BlockComponent},
      // {path: 'edit/:id', component: EditComponent}
    ]
  },
      {path: 'blocks/add', component: AddBlockComponent},
      {path: 'blocks/edit/:id', component: EditComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}