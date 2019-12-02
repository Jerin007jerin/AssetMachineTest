import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assetmaster } from './assetmaster';
import { Purchaseorder } from './purchaseorder';


@Injectable({
  providedIn: 'root'
})
export class AssetmasterService {

  constructor(private http:HttpClient) { }
  getAssetOrders(): Observable<any>{
    return this.http.get(environment.baseUrl+'/AssetMastersOrderView');
  }

  getAssetOrder(id:string): Observable<any>{
    return this.http.get(environment.baseUrl+'/AssetMastersOrderView?ordno='+id);
  }

  postAsset(asset: Assetmaster){
    return this.http.post(environment.baseUrl+'/AssetMasters',asset);
  }

  updatePurchase(id:number, purchase: Purchaseorder): Observable<any>{
    return this.http.put(environment.baseUrl+'/AssetMasters/'+ id, purchase);
  }

  getMasterList(): Observable<any>{
    return this.http.get(environment.baseUrl+'/AssetMasters');
  }
  
  
}
