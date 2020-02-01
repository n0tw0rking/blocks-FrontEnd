import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './modules/main-page/user/user.component';
import { LoginComponent } from './modules/login/login.component';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { ServicesPageComponent } from './modules/services-page/services-page.component';
import { BlocksPageComponent } from './modules/blocks-page/blocks-page.component';
import { AuthGuard } from './core/auth.guard';
import { BlockComponent } from './modules/blocks-page/block/block.component';


const routes: Routes = [
  { path: "login", component: LoginComponent, },
  { path:'', component: MainPageComponent },
  { path:'user', component: UserComponent,  //canActivate:[AuthGuard],
    children: [
      {path: '', component: UserComponent},
      {path: ':id', component: UserComponent}


    ] 
  },
  { path:'services', component: ServicesPageComponent },
  // { path:'blocks', component: BlocksPageComponent, canActivate:[AuthGuard]}
  { path:'blocks', component: BlocksPageComponent , children: [
    {path: '', component: BlockComponent},
    {path: ':id', component: BlockComponent}
  ] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
