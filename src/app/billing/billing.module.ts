import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingHomeComponent } from './billing-home/billing-home.component';
import { routes } from './routes.billing'
import { RouterModule } from '@angular/router';
import { ProductBillComponent } from '../products/product-bill/product-bill.component'
import { AuthGuard } from '../auth.guard';
import { HomeComponent } from '../home/home.component';
@NgModule({
  declarations: [BillingHomeComponent, ProductBillComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [{
        path: 'home', component: HomeComponent,canActivate: [AuthGuard],
        children:
          [
            {
              path: "billing",
              component: BillingHomeComponent,
              canActivate: [AuthGuard]
            }
          ]
      }])

  ] 

})
export class BillingModule { }
