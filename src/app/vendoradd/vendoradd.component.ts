import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-vendoradd',
  templateUrl: './vendoradd.component.html',
  styleUrls: ['./vendoradd.component.scss']
})
export class VendoraddComponent implements OnInit {
  vendorform:FormGroup;
  vendors:Vendor=new Vendor();
  assettypes:Observable<Assettype[]>;
  constructor(private formbuilder:FormBuilder,private vendorservice:VendorService,private toastr:ToastrService,private router:Router,private assetservice:AssetService) { }

  ngOnInit() {
    this.vendorform=this.formbuilder.group({
      
      vd_name :['',[Validators.required]],
      vd_type:['Supplier',[Validators.required]],
      vd_atype_id:['',[Validators.required]],
      vd_from:['',[Validators.required]],
      vd_to:['',[Validators.required]],
      vd_addr:['',[Validators.required]],
    });
    this.assettypes=this.vendorservice.getAssettype();
  }

  get formControls()
  {
    return this.vendorform.controls;
  }
  addvendor()
  {
    /*if(this.assetform.invalid)
    {
      return
    }*/
    this.vendors.vd_name=this.vendorform.controls.vd_name.value;
    this.vendors.vd_type=this.vendorform.controls.vd_type.value;
    this.vendors.vd_atype_id=this.vendorform.controls.vd_atype_id.value;
    this.vendors.vd_from=this.vendorform.controls.vd_from.value;
    this.vendors.vd_to=this.vendorform.controls.vd_to.value;
    this.vendors.vd_addr=this.vendorform.controls.vd_addr.value;
    this.vendorservice.AddVendor(this.vendors).subscribe(x=>{
      if(x==0)
      {
        this.toastr.success('vendor added')
        this.router.navigate(['vendorlist'])
      }
      else{
      this.toastr.error("asset already exist")
      
      }
     
        
      
    });
    this.ngOnInit();
  }

}
