import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';
import { Asset } from '../asset';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Vendor } from '../vendor';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-assetlist',
  templateUrl: './assetlist.component.html',
  styleUrls: ['./assetlist.component.scss']
})
export class AssetlistComponent implements OnInit {
  assets: Observable<Asset[]>;
  




  constructor(private assetservice: AssetService, private toastr: ToastrService, private loginservice: LoginService, private router: Router,private locationstrategy:LocationStrategy) { 
    history.pushState(null,null,window.location.href);
    this.locationstrategy.onPopState(()=>{
      history.pushState(null,null,window.location.href);
    });
  }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.assets = this.assetservice.GetAssetList();
    this.assetservice.GetAssetList().subscribe(data => console.log(data));
    
  }
  deleteasset(id: number) {
    if(confirm('do you want to delete this record?'))
    {
    
    this.assetservice.DeleteAsset(id).subscribe(x => {
      this.toastr.error('Product Deleted');
    });

    this.reloadData();
  }
}
  logout() {
    this.loginservice.Logout();
    this.router.navigate(['login']);
  }
  SearchAsset(ad_name: string) {
    this.assets = this.assetservice.searchasset(ad_name);
    if (ad_name == "") {
      this.assets = this.assetservice.GetAssetList();
    }
  }




}
