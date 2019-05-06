import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { _ } from 'underscore';
import * as jspdf from 'jspdf';    
import * as  html2canvas from 'html2canvas';  
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeliveryService } from 'src/app/delivery/delivery.service';
@Component({
  selector: 'app-wing-wise-report',
  templateUrl: './wing-wise-report.component.html',
  styleUrls: ['./wing-wise-report.component.css']
})
export class WingWiseReportComponent implements OnInit {
 
  constructor(public reportService:ReportService,public aR:ActivatedRoute,
              public dS:DeliveryService) { }
  deliveryStatus;
  deliveryStatusFlag;
  
  generatePDF(s){
    html2canvas(document.getElementById(s)).then((canvas)=>{
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF 
    })    
  }
  wingWiseData={};
  wingWiseQuantity={};
  wingFlatWiseData={};
  products=[];
  wings=[];
  productWiseData={};
  finalWingWiseReport=[];
  subscriptions;
  selectedDate;
  showSpinner: boolean = true;
  ngOnInit() {
    this.aR.queryParams.subscribe((res)=>{
      console.log(res)
      this.selectedDate=(Date.UTC(res.year,res.month-1,res.day)/1000);//).getTime())
      console.log(this.selectedDate);
      this.selectedDateSubscriptions();
      this.getDeliveryStatus(this.selectedDate);
    })
    
  }
  getDeliveryStatus(date){
    this.dS.getDeliveryStatusByDate(date).then((res)=>{      
      this.deliveryStatus = res;
      console.log("this.deliveryStatus",this.deliveryStatus)
    })
  }
  delivered(){
    console.log("this.selectedDate",this.selectedDate);    
    this.dS.addDeliveryStatus(this.selectedDate).subscribe((res)=>{
      this.deliveryStatus = 'delivered';
      this.dS.addDeliveries(this.selectedDate,this.products);
    })
  }
  selectedDateSubscriptions(){
    this.reportService.filteredSubscriptions(this.selectedDate)
    .then((res)=>{
      console.log(res)
      this.wingWiseData={};
      this.wingWiseQuantity={};
      this.wingFlatWiseData={};
      this.products=[];
      this.wings=[];
      this.productWiseData={};
      this.finalWingWiseReport=[];
      this.subscriptions=[];
        this.subscriptions=res;
        res.forEach((i,index)=>{
          var key;
          var ar = [];
          console.log(i.wing)
          if(this.wingWiseData[i.wing]==undefined){                   
              this.wingWiseData[i.wing]=[];        
          }
          this.wingWiseData[i.wing].push(i);
        })

        for(let key in this.wingWiseData){ 
          var ar = this.wingWiseData[key].map((a)=>{
            if(this.products.indexOf(a['productId'])==-1){
              this.products.push(a['productId'])
              this.productWiseData[a['productId']]={'name':a['productName'],'quantity':a['quantity']}
            } 
            else{
              this.productWiseData[a['productId']].quantity+=a['quantity'];
            }   
            return {[a['productId']]:a['quantity']}
          })
          this.wingWiseQuantity[key] = ar;         
        }
        console.log("this.productWiseData",this.productWiseData);
        for(let wing in this.wingWiseQuantity){
          this.finalWingWiseReport.push({'wing':wing})
          this.wings.push(wing);
          for(let i=0;i<this.products.length;i++){
            let q=0;
            for(let j=0;j<this.wingWiseQuantity[wing].length;j++){
              if(this.wingWiseQuantity[wing][j][this.products[i]]){
                q=q+this.wingWiseQuantity[wing][j][this.products[i]];                            
              }
            }
            this.finalWingWiseReport[this.finalWingWiseReport.length-1][this.products[i]]=q;
          }
        }
        this.finalWingWiseReport.map((w,i)=>{
          
        })
        console.log("this.wingWiseData",this.wingWiseData)
        console.log("this.wingWiseQuantity",this.wingWiseQuantity)
        console.log("subscriptions",this.subscriptions)
        console.log("finalWingWiseReport",this.finalWingWiseReport)
      
    })
    /**/
  }
  getProductNameById(id){
    this.reportService.getProductDetailsById(id).subscribe((res)=>{
      return res;
    })
  }
  whingWiseTotal(wingName){    
    var total=0;
    this.wingWiseData[wingName].forEach((a)=>{
      total+=a.quantity;
    })
    return total;
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.showSpinner=false;
  }
}