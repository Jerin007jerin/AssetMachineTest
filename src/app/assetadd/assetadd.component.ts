import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assetadd',
  templateUrl: './assetadd.component.html',
  styleUrls: ['./assetadd.component.scss']
})
export class AssetaddComponent implements OnInit {
assetform:FormGroup;
assets:Asset=new Asset();
  constructor(private formbuilder:FormBuilder,private assetservice:AssetService,private toastr:ToastrService) { }

  ngOnInit() {
    this.assetform=this.formbuilder.group({
      ad_name:['',[Validators.required]],
      ad_type_id:['',[Validators.required]],
      ad_class:['',[Validators.required]]
    });
  }
  get formControls()
  {
    return this.assetform.controls;
  }
  addasset()
  {
    if(this.assetform.invalid)
    {
      return
    }
    this.assets.ad_name=this.assetform.controls.ad_name.value;
    this.assets.ad_type_id=this.assetform.controls.ad_type_id.value;
    this.assets.ad_class=this.assetform.controls.ad_class.value;
    this.assetservice.AddAsset(this.assets).subscribe(x=>{
      this.toastr.success('asset added')
    });
  }
  

}
