import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AssetaddComponent } from './assetadd/assetadd.component';
import { AssetlistComponent } from './assetlist/assetlist.component';
import { AsseteditComponent } from './assetedit/assetedit.component';
import { VendoraddComponent } from './vendoradd/vendoradd.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { VendoreditComponent } from './vendoredit/vendoredit.component';
import { AuthGuard } from './auth.guard';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { PurchaseaddComponent } from './purchaseadd/purchaseadd.component';
import { PurchaseeditComponent } from './purchaseedit/purchaseedit.component';
import { AssetmasterlistComponent } from './assetmasterlist/assetmasterlist.component';
import { AssetmasterComponent } from './assetmaster/assetmaster.component';
import { AssetmasterorderComponent } from './assetmasterorder/assetmasterorder.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'assetadd',component:AssetaddComponent,canActivate:[AuthGuard]},
  {path:'assetlist',component:AssetlistComponent,canActivate:[AuthGuard]},
  {path:'assetedit/:id',component:AsseteditComponent,canActivate:[AuthGuard]},
  {path:'vendoradd',component:VendoraddComponent,canActivate:[AuthGuard]},
  {path:'vendorlist',component:VendorlistComponent,canActivate:[AuthGuard]},
  {path:'vendoredit/:id',component:VendoreditComponent,canActivate:[AuthGuard]},
  {path:'purchaselist',component:PurchaselistComponent,canActivate:[AuthGuard]},
  {path:'purchaseadd',component:PurchaseaddComponent,canActivate:[AuthGuard]},
  {path:'purchaseedit/:id',component:PurchaseeditComponent,canActivate:[AuthGuard]},
  {path:'masterlist',component:AssetmasterlistComponent,canActivate:[AuthGuard]},
  {path:'assetmaster/:id',component:AssetmasterComponent,canActivate:[AuthGuard]},
  {path:'masterorderlist',component:AssetmasterorderComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
