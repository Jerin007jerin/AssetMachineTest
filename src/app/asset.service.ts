import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }
  GetAssetList(): Observable<any> {
    return this.http.get(environment.baseUrl + '/AssetDefs');
  }
  AddAsset(asset: Asset) {
    return this.http.post(environment.baseUrl + '/AssetDefs', asset);
  }
  DeleteAsset(id: number) {
    return this.http.delete(environment.baseUrl + '/AssetDefs/' + id);
  }
  getAssettype(): Observable<any> {
    return this.http.get(environment.baseUrl + '/AssetTypes');
  }
  UpdateAsset(id: number, asset: Asset) {
    return this.http.put(environment.baseUrl + '/AssetDefs/' + id, asset);
  }
  GetAsset(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/AssetDefs/' + id);
  }
  searchasset(name: string): Observable<any> {
    return this.http.get(environment.baseUrl + '/AssetDefs?name=' + name);
  }




}
