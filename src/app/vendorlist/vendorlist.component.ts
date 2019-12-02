import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Observable } from 'rxjs';
import { Vendor } from '../vendor';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.scss']
})
export class VendorlistComponent implements OnInit {
  vendors: Observable<Vendor[]>;
  constructor(private vendorservice: VendorService, private toastr: ToastrService, private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.vendors = this.vendorservice.GetVendorList();
    this.vendorservice.GetVendorList().subscribe(data => console.log(data));
  }
  logout() {
    this.loginservice.Logout();
    this.router.navigate(['login']);
  }
  deletevendor(id: number) {
    if (confirm('do you want to delete this record?')) {
      this.vendorservice.DeleteVendor(id).subscribe(x => {
        this.toastr.error('Vendor Deleted');

      });

      this.reloadData();
    }
  }
}
