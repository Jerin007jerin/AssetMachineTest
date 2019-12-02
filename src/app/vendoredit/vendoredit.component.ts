import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendoredit',
  templateUrl: './vendoredit.component.html',
  styleUrls: ['./vendoredit.component.scss']
})
export class VendoreditComponent implements OnInit {
  vendor: Vendor = new Vendor();
  assettypes: Observable<Assettype[]>;

  vendorform: FormGroup;
  constructor(private formbuilder: FormBuilder, private toastr: ToastrService,private router: ActivatedRoute,private vendorservice:VendorService,private route:Router) { }
  id: number;
  ngOnInit() {


    this.vendorform = this.formbuilder.group({
      vd_id : ['', [Validators.required]],
      vd_name: ['', [Validators.required]],
      vd_type: ['', [Validators.required]],
      vd_atype_id: ['', [Validators.required]],
      vd_from: ['', [Validators.required]],
      vd_to: ['', [Validators.required]],
      vd_addr: ['', [Validators.required]]
    });
    this.id = this.router.snapshot.params["id"];

    this.vendorservice.GetVendor(this.id).subscribe(x => {
      this.vendor = x;
      this.assettypes = this.vendorservice.getAssettype();
    });
   
  }
  get formControls() {
    return this.vendorform.controls;
  }
  updatevendor() {
    this.vendor.vd_id= this.id;
    this.vendor.vd_name = this.vendorform.controls.vd_name.value;
    this.vendor.vd_type= this.vendorform.controls.vd_type.value;
    this.vendor.vd_atype_id = this.vendorform.controls.vd_atype_id.value;
    this.vendor.vd_from= this.vendorform.controls.vd_from.value;
    this.vendor.vd_to= this.vendorform.controls.vd_to.value;
    this.vendor.vd_addr= this.vendorform.controls.vd_addr.value;
    this.vendorservice.UpdateVendor(this.id, this.vendor).subscribe(res => {
    this.toastr.success("update successfull");
    this.route.navigate(['vendorlist']);
    });
  }

}
