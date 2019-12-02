import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { PurchaseService } from '../purchase.service';
import { AssetmasterService } from '../assetmaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Assetmaster } from '../assetmaster';
import { Purchaseorder } from '../purchaseorder';

@Component({
  selector: 'app-assetmaster',
  templateUrl: './assetmaster.component.html',
  styleUrls: ['./assetmaster.component.scss']
})
export class AssetmasterComponent implements OnInit {
  master: Assetmaster =new Assetmaster();
  purchase: Purchaseorder=new Purchaseorder();
  masterForm: FormGroup;

  constructor(private loginservice: LoginService, private purchaseService:PurchaseService, private router:Router, private assetmasterservice:AssetmasterService , private route: ActivatedRoute, private formBuilder:FormBuilder, private toastr:ToastrService) { }
  id:string;
  ngOnInit() {

    this.id=this.route.snapshot.params["id"];
    console.log(this.id);

    this.masterForm=this.formBuilder.group({
      am_ad_name: [Validators.required],
      am_atype_name : ['',Validators.compose([Validators.required])],
      am_make_name: ['',Validators.compose([Validators.required])],
      am_qty: ['',Validators.compose([Validators.required])],
      am_myear: ['',Validators.compose([Validators.required])],
      am_warranty: ['',Validators.compose([Validators.required])],
      am_model: ['',Validators.compose([Validators.required])],
      am_from:[''],
      am_to: ['']

    }); 
    this.assetmasterservice.getAssetOrder(this.id).subscribe(res=>{
      this.purchase=res;
      this.master.am_ad_name=res["assetname"];
      this.master.am_atype_name=res["assettype"];
      console.log(res["vendorname"]);
      this.master.am_make_name=res["vendorname"];
      this.master.am_qty=res["pd_qty"];
      this.master.am_pdate=res["pd_ddateStr"];

    })


  }

  get formControls(){
    return this.masterForm.controls;
  }

  logout(){
    this.loginservice.Logout();
    this.router.navigateByUrl('login');
  }

  addAsset(){
    
    this.master.am_myear=this.masterForm.controls.am_myear.value;
    this.master.am_warranty=this.masterForm.controls.am_warranty.value;
    this.master.am_from=this.masterForm.controls.am_from.value;
    this.master.am_to=this.masterForm.controls.am_to.value;
    this.master.am_atype_id=this.purchase.pd_type_id;
    this.master.am_make_id=this.purchase.pd_vendor_id;
    this.master.am_ad_id=this.purchase.pd_ad_id;
    this.master.am_pdate=this.purchase.pd_ddate;
    this.master.am_model=this.masterForm.controls.am_model.value;
    this.purchase.pd_status='Asset Approved by Admin';
    this.assetmasterservice.updatePurchase(this.purchase.pd_id, this.purchase).subscribe();
    this.assetmasterservice.postAsset(this.master).subscribe(x=>{
      this.toastr.success('Asset Registered Successfully');
      this.router.navigateByUrl('masterlist');
    })
    

  }


  }


