import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { ReportModule } from './report/report.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReportsHomeComponent } from './report/reports-home/reports-home.component';
import { BillingModule } from './billing/billing.module';
import { CustomerModule } from './customer/customer.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { DataService } from './data.service';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReportModule,
    SharedModule,
    BillingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'home',
        component:HomeComponent,
        canActivate: [AuthGuard]
      },{
        path:'',
        component:LoginComponent
      }
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    CustomerModule,
    SubscriptionModule
  ],
  providers: [CustomerModule,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
