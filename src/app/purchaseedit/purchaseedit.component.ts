import { Component, OnInit } from '@angular/core';
import { Purchaseorder } from '../purchaseorder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchaseedit',
  templateUrl: './purchaseedit.component.html',
  styleUrls: ['./purchaseedit.component.scss']
})
export class PurchaseeditComponent implements OnInit {
  purchases: Purchaseorder= new Purchaseorder();
  purchaseform: FormGroup;
  id:number;

  constructor(private router:ActivatedRoute,private purchaseservice: PurchaseService,private route:Router,private formbuilder:FormBuilder, private toastr:ToastrService ) { }

  ngOnInit() {
    this.id=this.router.snapshot.params["id"];

    this.purchaseform=this.formbuilder.group({
      pd_order_no : ['',Validators.compose([Validators.required])],
      pd_ad_id: ['',Validators.compose([Validators.required])],
      pd_type_id: ['',Validators.compose([Validators.required])],
      pd_qty: ['',Validators.compose([Validators.required])],
      pd_vendor_id: ['',Validators.compose([Validators.required])],
      pd_status: ['',Validators.compose([Validators.required])],
      pd_odate: ['',Validators.compose([Validators.required])],
      pd_ddate: ['',Validators.compose([Validators.required])]
    }); 

    this.purchaseservice.getPurchase(this.id).subscribe(x=>{
      this.purchases=x;
    })

  }
  get formControls(){
    return this.purchaseform.controls;
  }

  updatePurchase(){
    this.purchases.pd_id=this.id;
    this.purchases.pd_ad_id=this.purchases.pd_ad_id;
    this.purchases.pd_order_no=this.purchaseform.controls.pd_order_no.value;
    this.purchases.pd_type_id=this.purchases.pd_type_id;
    this.purchases.pd_vendor_id=this.purchases.pd_vendor_id;
    this.purchases.pd_qty=this.purchases.pd_qty;
    this.purchases.pd_odate=this.purchaseform.controls.pd_odate.value;
    this.purchases.pd_ddate=this.purchaseform.controls.pd_ddate.value;
    this.purchases.pd_status='Consignment Received';
    
    
    
    if(this.purchases.pd_odate<this.purchases.pd_ddate)
    {
      this.purchaseservice.updatePurchase(this.id, this.purchases).subscribe(res=>{
        this.toastr.success('Purchase Updated');
        this.route.navigateByUrl("purchaselist");
      });
    }
    else
    {
      this.toastr.warning('Purchase date must be less than Delivery date');
    }

  }

  
  
}
