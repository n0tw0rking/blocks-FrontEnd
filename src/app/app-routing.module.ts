<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './modules/main-page/user/user.component';
import { LoginComponent } from './modules/login/login.component';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { ServicesPageComponent } from './modules/services-page/services-page.component';
import { BlocksPageComponent } from './modules/blocks-page/blocks-page.component';
import { AuthGuard } from './core/auth.guard';
import { BlockComponent } from './modules/blocks-page/block/block.component';
import { AddBlockComponent } from './modules/blocks-page/add-block/add-block.component';
import { EditComponent } from './modules/blocks-page/edit/edit.component';

=======
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./modules/main-page/user/user.component";
import { LoginComponent } from "./modules/login/login.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { ServicesPageComponent } from "./modules/services-page/services-page.component";
import { BlocksPageComponent } from "./modules/blocks-page/blocks-page.component";
import { AuthGuard } from "./core/auth.guard";
import { BlockComponent } from "./modules/blocks-page/block/block.component";
import { SuperAdminComponent } from "./modules/super-admin/super-admin.component";
>>>>>>> 620ff1c5a07cfd6616eaeac1a939a4c5ce4837dd

const routes: Routes = [
  { path: "super", component: SuperAdminComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "", component: MainPageComponent, canActivate: [AuthGuard] },
  // { path:'user', component: UserComponent,  canActivate:[AuthGuard] ,
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],

    children: [
      { path: "", component: UserComponent },
      { path: ":id", component: UserComponent }
    ]
  },
  {
    path: "services",
    component: ServicesPageComponent,
    canActivate: [AuthGuard]
  },
  { path: "blocks", component: BlocksPageComponent, canActivate: [AuthGuard] },
  // { path: "blocks", component: BlocksPageComponent },
  {
    path: "blocks",
    component: BlocksPageComponent,
    canActivate: [AuthGuard],
    children: [
<<<<<<< HEAD
      {path: '', component: BlockComponent},
      {path: 'edit', component: EditComponent, children:[
        {path: ':id', component: BlockComponent }
      ]}
=======
      { path: "", component: BlockComponent },
      { path: ":id", component: BlockComponent }

>>>>>>> 620ff1c5a07cfd6616eaeac1a939a4c5ce4837dd
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}