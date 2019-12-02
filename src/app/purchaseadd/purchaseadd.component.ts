import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Purchaseorder } from '../purchaseorder';
import { Assettype } from '../assettype';
import { Vendor } from '../vendor';
import { Observable } from 'rxjs';
import { PurchaseService } from '../purchase.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AssetService } from '../asset.service';
import { Asset } from '../asset';
import { element } from 'protractor';

@Component({
  selector: 'app-purchaseadd',
  templateUrl: './purchaseadd.component.html',
  styleUrls: ['./purchaseadd.component.scss']
})
export class PurchaseaddComponent implements OnInit {
  purchaseform: FormGroup;
  purchaseorders: Purchaseorder = new Purchaseorder();
  assettypes: Observable<Assettype[]>;
  vendors: Observable<Vendor[]>;
  assetId: number;
  constructor(private formbuilder: FormBuilder, private purchaseorderservice: PurchaseService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.purchaseform = this.formbuilder.group({
      pd_order_no: ['ORD' + Math.floor((Math.random() * 10000) + 1), Validators.compose([Validators.required])],
     // pd_ad_id: ['', [Validators.required]],
      pd_type_id: ['', [Validators.required]],
      pd_vendor_id: ['', [Validators.required]],
      pd_qty: ['', [Validators.required]],
    //  pd_odate: ['', [Validators.required]],
     // pd_ddate: ['', [Validators.required]],
     // pd_status: ['PO-Raised With Supplier', [Validators.required]]
    });
  }
  get formControls() {
    return this.purchaseform.controls;
  }
  Addpurchaseorder() {
    this.purchaseorders.pd_order_no = this.purchaseform.controls.pd_order_no.value;
    this.purchaseorders.pd_ad_id = this.assetId;
    this.purchaseorders.pd_type_id = this.purchaseform.controls.pd_type_id.value;
    console.log(this.purchaseorders.pd_type_id);
    this.purchaseorders.pd_vendor_id = this.purchaseform.controls.pd_vendor_id.value;
    console.log(this.purchaseorders.pd_vendor_id)
    this.purchaseorders.pd_qty = this.purchaseform.controls.pd_qty.value;
    //this.purchaseorders.pd_odate = this.purchaseform.controls.pd_odate.value;
    //this.purchaseorders.pd_ddate = this.purchaseform.controls.pd_ddate.value;
    this.purchaseorders.pd_status = "PO Raised With Supplier";
    this.purchaseorderservice.AddPurchaseOrder(this.purchaseorders).subscribe(x => {
      this.toastr.success('Order Placed');
      this.router.navigate(['purchaselist']);

    });
    this.ngOnInit();
  }
  SearchAsset(name: string) {
    this.assettypes = this.purchaseorderservice.getAssettype(name);
    this.purchaseorderservice.searchasset(name).subscribe(res => {
      res.forEach(element => {
        this.assetId = element["ad_id"];
        console.log(this.assetId);
      });
    })
  }
  onOptionsSelected(value: number) {
    this.vendors = this.purchaseorderservice.getVendorname(value);
    this.vendors.subscribe(x => {
      x.forEach(element => {
        console.log(element["vd_name"]);
      })
    })
  }
}

