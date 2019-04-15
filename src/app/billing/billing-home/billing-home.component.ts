import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { DeliveryService } from 'src/app/delivery/delivery.service';
import { _ } from 'underscore';
import * as jspdf from 'jspdf';    
import * as  html2canvas from 'html2canvas'; 
import { CustomerService } from 'src/app/customer/customer.service';
@Component({
  selector: 'app-billing-home',
  templateUrl: './billing-home.component.html',
  styleUrls: ['./billing-home.component.css']
})
export class BillingHomeComponent implements OnInit {

  constructor(public pS:ProductService,public dS:DeliveryService,public cS:CustomerService) { }
  customerDetails=[];
  products=[];
  productIds=[];
  mobileWiseData;
  deliveredProductsData={};
  totalBill=0;
  
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
  ngOnInit() {
    this.dS.getAllDeliveries().subscribe(res=>{
      console.log("All deliveries::",res);
      var x = _.groupBy(res,'mobileNumber');
      for(let key in x){
        this.customerDetails.push({'mobileNumber':key,'flatNumber':x[key][0].flatNumber})
        var y = _.groupBy(x[key],'productId')
        console.log("y:::",y);
        this.deliveredProductsData[key]=y;
        for(let k in y){
          if(this.products.indexOf(k)==-1){
            this.products.push({'productId':k,'productName':y[k][0].productName});
          }
          var z = y[k].reduce((a,b)=>{
            if(a.cost){
              return (a.cost*a.quantity)+(b.cost*b.quantity);
            }            
            else{
              return a+(b.cost*b.quantity);
            }
          })
        }
      }
      console.log(x);
      this.mobileWiseData=x;
      console.log(this.deliveredProductsData);
      console.log(this.customerDetails);
      this.products=_.indexBy(this.products,'productId');
      this.productIds = _.allKeys(this.products);
      console.log(this.productIds)
    })
  }
  monthBill(data){
    this.totalBill=0;
    data.forEach((a)=>{
      this.totalBill += a.cost*a.quantity;
    })   
    return this.totalBill;
  }
}
