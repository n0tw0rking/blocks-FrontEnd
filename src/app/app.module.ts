import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { NavBarComponent } from "./modules/main-page/nav-bar/nav-bar.component";
import { UserComponent } from "./modules/main-page/user/user.component";
import { LoginComponent } from "./modules/login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ServicesPageComponent } from "./modules/services-page/services-page.component";
import { ServiceComponent } from "./modules/services-page/service/service.component";
import { BlocksPageComponent } from "./modules/blocks-page/blocks-page.component";
import { BlockComponent } from "./modules/blocks-page/block/block.component";
import { SideNavComponent } from "./modules/blocks-page/side-nav/side-nav.component";
import { TokenInterceptor } from "./core/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GraphQLModule } from "./graphql.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AuthService } from "./core/auth.service";
import { AuthGuard } from "./core/auth.guard";
import { ApolloService } from "./core/apollo.service";
import { SuperAdminComponent } from './modules/super-admin/super-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavBarComponent,
    UserComponent,
    LoginComponent,
    ServicesPageComponent,
    ServiceComponent,
    BlocksPageComponent,
    BlockComponent,
    SideNavComponent,
    SuperAdminComponent,
    AddBlockComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ApolloService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
