import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AssetmasterService } from '../assetmaster.service';
import { Assetmaster } from '../assetmaster';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assetmasterlist',
  templateUrl: './assetmasterlist.component.html',
  styleUrls: ['./assetmasterlist.component.scss']
})
export class AssetmasterlistComponent implements OnInit {
  masters: Observable<Assetmaster[]>;
  constructor(private loginservice: LoginService, private router: Router, private masterservice:AssetmasterService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData(){
    this.masters=this.masterservice. getMasterList();
    this.masters.forEach(x=>{
    console.log(x);
    })
  }

  logout(){
    this.loginservice.Logout();
    this.router.navigateByUrl('login');
  }
}


