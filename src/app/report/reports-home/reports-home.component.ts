import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css']
})
export class ReportsHomeComponent implements OnInit {
  
  model: NgbDateStruct;
  date: {year: number, month: number,day: number};

  constructor(private calendar: NgbCalendar,public router:Router,public cS:CustomerService) { }

  ngOnInit() {
  }
  generateReport(sDate){
    console.log("Log cleared at generate Report")
    console.log(sDate);
    this.router.navigate(['/home/reports/wingWiseReport'],{queryParams: sDate })
  }
}
