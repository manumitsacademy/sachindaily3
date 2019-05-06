import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PauseDeliveryComponent } from './pause-delivery/pause-delivery.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeDeliveryComponent } from './subscribe-delivery/subscribe-delivery.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { ChangeSubscriptionComponent } from './change-subscription/change-subscription.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth.guard';
@NgModule({
  declarations: [CustomerHomeComponent, RangeSliderComponent, CustomerListComponent,AddCustomerComponent, CustomerDetailsComponent, PauseDeliveryComponent, SubscribeDeliveryComponent, ChangeSubscriptionComponent, ProductCardComponent],
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {        path: 'home', component: HomeComponent,canActivate: [AuthGuard],
              children:

        [
          {
              path:'customer',
              component:CustomerHomeComponent,
              canActivate: [AuthGuard],
              children:[
                {
                  path:'customerList',
                  component:CustomerListComponent,
                  canActivate: [AuthGuard]
                },
                {
                  path:'addCustomer',
                  component:AddCustomerComponent,
                  canActivate: [AuthGuard]

                },
                {
                  path:'customerDetails',
                  component:CustomerDetailsComponent,
                  canActivate: [AuthGuard]
                },
                {
                  path:"",
                  component:CustomerListComponent,
                  canActivate: [AuthGuard]
                }
              ]
          }
        ]
      }
    ])
  ]
})
export class CustomerModule { }
