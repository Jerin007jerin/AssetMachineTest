import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Assettype } from '../assettype';

@Component({
  selector: 'app-assetadd',
  templateUrl: './assetadd.component.html',
  styleUrls: ['./assetadd.component.scss']
})
export class AssetaddComponent implements OnInit {
assetform:FormGroup;
assets:Asset=new Asset();
assettypes:Observable<Assettype[]>;
  constructor(private formbuilder:FormBuilder,private assetservice:AssetService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.assetform=this.formbuilder.group({
      ad_name:['',[Validators.required]],
      ad_type_id:['',[Validators.required]],
      ad_class:['',[Validators.required]]
    });
    this.assettypes=this.assetservice.getAssettype();
  }
  get formControls()
  {
    return this.assetform.controls;
  }
  addasset()
  {
    /*if(this.assetform.invalid)
    {
      return
    }*/
    this.assets.ad_name=this.assetform.controls.ad_name.value;
    this.assets.ad_type_id=this.assetform.controls.ad_type_id.value;
    this.assets.ad_class=this.assetform.controls.ad_class.value;
    
    this.assetservice.AddAsset(this.assets).subscribe(x=>{
      if(x==0)
      {
        this.toastr.success('asset added')
        this.router.navigate(['assetlist'])
      }
      else{
      this.toastr.error("asset already exist")
      
      }
     
    });
    this.ngOnInit();
  }
  

}
