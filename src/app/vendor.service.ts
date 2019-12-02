import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }
  GetVendorList():Observable<any>{
    return this.http.get(environment.baseUrl+'/VendorCreations');
  }
  AddVendor(vendor: Vendor) {
    return this.http.post(environment.baseUrl + '/VendorCreations', vendor);
  }
  getAssettype(): Observable<any> {
    return this.http.get(environment.baseUrl + '/AssetTypes');
  }
  DeleteVendor(id: number) {
    return this.http.delete(environment.baseUrl + '/VendorCreations/' + id);
  }
  UpdateVendor(id: number,vendor:Vendor) {
    return this.http.put(environment.baseUrl + '/VendorCreations/' + id, vendor);
  }
  GetVendor(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/VendorCreations/' + id);
  }
}
