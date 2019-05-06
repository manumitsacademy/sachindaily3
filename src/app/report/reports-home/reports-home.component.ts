import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css'],
  providers: [DatePipe]
})
export class ReportsHomeComponent implements OnInit {
  
  model: NgbDateStruct;
  date: {year: number, month: number};
  i;
  myDate = new Date();
  currdate = this.datePipe.transform(this.myDate, 'dd-mm');
  constructor(private calendar: NgbCalendar,public router:Router,private datePipe: DatePipe) { 
   
  }

  isDisabled = (date: NgbDate, current: {month: number}) => (date.day) > parseInt( this.currdate);

  ngOnInit() {
    // for(this.i=this.currdate;this.i>=this.currdate;this.i++){
      console.log(this.currdate);
    //   // const isDisabled = (date: NgbDate, current: {month: number}) => date.day === 13;
    // }
  }


  generateReport(sDate){
    console.clear();
    console.log("Log cleared at generate Report")
    console.log(sDate);
    this.router.navigate(['/reports/wingWiseReport'],{queryParams: sDate })
  }
}
 