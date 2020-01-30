import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './modules/main-page/user/user.component';
import { LoginComponent } from './modules/login/login.component';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { ServicesPageComponent } from './modules/services-page/services-page.component';
import { BlocksPageComponent } from './modules/blocks-page/blocks-page.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path:'', component: MainPageComponent },
  { path:'user', component: UserComponent },
  { path:'services', component: ServicesPageComponent },
  { path:'blocks', component: BlocksPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
