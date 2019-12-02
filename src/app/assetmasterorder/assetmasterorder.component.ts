import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AssetmasterService } from '../assetmaster.service';
import { Observable } from 'rxjs';
import { Purchaseorder } from '../purchaseorder';

@Component({
  selector: 'app-assetmasterorder',
  templateUrl: './assetmasterorder.component.html',
  styleUrls: ['./assetmasterorder.component.scss']
})
export class AssetmasterorderComponent implements OnInit {
  purchases: Observable<Purchaseorder[]>;
  constructor(private loginservice:LoginService, private toastr: ToastrService, private router:Router, private assetmasterService: AssetmasterService) { }

  ngOnInit() {

    this.reloadData();
  }
  reloadData(){
    this.purchases=this.assetmasterService.getAssetOrders();
  }

  logout(){
    this.loginservice.Logout();
    this.router.navigateByUrl('login');
  }
}
