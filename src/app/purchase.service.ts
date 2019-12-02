import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchaseorder } from './purchaseorder';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }
  GetPurchaseOrderList(): Observable<any> {
    return this.http.get(environment.baseUrl + '/PurchaseOrders');
  }
  AddPurchaseOrder(purchaseorder: Purchaseorder) {
    return this.http.post(environment.baseUrl + '/PurchaseOrders', purchaseorder);
  }
  getAssettype(name: string): Observable<any> {
    return this.http.get(environment.baseUrl + '/PurchaseOrders?name=' + name);
  }
  getVendorname(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/PurchaseOrders/' + id);
  }
  searchasset(name: string): Observable<any> {
    return this.http.get(environment.baseUrl + '/AssetDefs?name=' + name);
  }
  getPurchase(id:number):Observable<any> {
    return this.http.get(environment.baseUrl + '/PurchaseEditOrders/' + id);
  }
  updatePurchase(id:number,purchase:Purchaseorder):Observable<any> {
    return this.http.put(environment.baseUrl + '/PurchaseEditOrders/' + id,purchase);
  }
  cancelPurchase(id:number):Observable<any> {
    return this.http.delete(environment.baseUrl + '/PurchaseEditOrders/' + id);
  }
}
