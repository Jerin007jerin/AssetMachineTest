import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';
import { Asset } from '../asset';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assetlist',
  templateUrl: './assetlist.component.html',
  styleUrls: ['./assetlist.component.scss']
})
export class AssetlistComponent implements OnInit {
  assets:Observable<Asset[]>;
  constructor(private assetservice:AssetService,private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData(){
this.assets=this.assetservice.GetAssetList();
  }
  deleteasset(id: number) {
    this.assetservice.DeleteAsset(id).subscribe(x => {
      this.toastr.error('Product Deleted');
    });

    this.ngOnInit();
  }

}
