import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { Purchaseorder } from '../purchaseorder';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchaselist',
  templateUrl: './purchaselist.component.html',
  styleUrls: ['./purchaselist.component.scss']
})
export class PurchaselistComponent implements OnInit {
  purchaseorders: Observable<Purchaseorder>;
  constructor(private purchaseservice: PurchaseService, private loginservice: LoginService, private router: Router,private toastr:ToastrService) { }
 

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.purchaseorders = this.purchaseservice.GetPurchaseOrderList();
    this.purchaseservice.GetPurchaseOrderList().subscribe(data => console.log(data));
  }
  logout() {
    this.loginservice.Logout();
    this.router.navigate(['login']);
  }
  cancelOrder(value: number){
    
    if(confirm('Do you want to delete this record?'))
    {

    
    this.purchaseservice.cancelPurchase(value).subscribe(x => {
      this.toastr.error('Order Canceled');
    });


      this.reloadData();
    }
  }
  
}
