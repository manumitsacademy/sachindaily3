import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { RouterModule } from '@angular/router';
import { WingWiseReportComponent } from './wing-wise-report/wing-wise-report.component';
import { FlatWiseReportComponent } from './flat-wise-report/flat-wise-report.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductnamePipe } from './productname.pipe';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth.guard';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [ReportsHomeComponent, WingWiseReportComponent, FlatWiseReportComponent, ProductnamePipe,LoadingSpinnerComponent],
  imports: [
    CommonModule, HttpClientModule, MatTableModule, FormsModule, NgbModule,
    RouterModule.forChild(
      [{
        path: 'home', component: HomeComponent,canActivate: [AuthGuard],
                children:
          [
            {
              path: 'reports',
              component: ReportsHomeComponent,
              canActivate: [AuthGuard],
              children: [
                {
                  path: 'wingWiseReport',
                  component: WingWiseReportComponent,
                  canActivate: [AuthGuard]
                },
                {
                  path: 'flatWiseReport',
                  component: FlatWiseReportComponent,
                  canActivate: [AuthGuard]
                }
              ]
            }

          ]
      }
      ])]

})
export class ReportModule { }
