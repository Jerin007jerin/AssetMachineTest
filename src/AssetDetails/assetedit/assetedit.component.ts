import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Assettype } from 'src/app/assettype';
import { AssetService } from 'src/app/asset.service';
import { Asset } from 'src/app/asset';

@Component({
  selector: 'app-assetedit',
  templateUrl: './assetedit.component.html',
  styleUrls: ['./assetedit.component.scss']
})
export class AsseteditComponent implements OnInit {
  asset: Asset=new Asset();
  assettypes: Observable<Assettype[]>;
  
  assetform: FormGroup;
  constructor(private formbuilder: FormBuilder, private assetservice:AssetService, private toastr: ToastrService, private router: ActivatedRoute,private route:Router) { }
  id: number;
  ngOnInit() {

    this.assetform = this.formbuilder.group({
      ad_id: [Validators.required],
      ad_name: ['', [Validators.required]],
      ad_type_id: ['', [Validators.required]],
      ad_class: ['', [Validators.required]]
    });
    this.id = this.router.snapshot.params["id"];
 
    this.assetservice.GetAsset(this.id).subscribe(x => {
      this.asset = x;
      
    });
    this.assettypes = this.assetservice.getAssettype();
  }
  get formControls() {
    return this.assetform.controls;
  }
  updateasset() {
    this.asset.ad_id = this.id;
    this.asset.ad_name = this.assetform.controls.ad_name.value;
    this.asset.ad_type_id = this.assetform.controls.ad_type_id.value;
    this.asset.ad_class = this.assetform.controls.ad_class.value;
    this.assetservice.UpdateAsset(this.id, this.asset).subscribe(res => {
    this.toastr.success("update successfull");
    this.route.navigate(['assetlist']);

    });
  }

}
