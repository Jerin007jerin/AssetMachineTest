import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AssetlistComponent } from './assetlist/assetlist.component';
import { AssetaddComponent } from './assetadd/assetadd.component';
import { AsseteditComponent } from './assetedit/assetedit.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'; 
import {NgxPaginationModule} from 'ngx-pagination'
import { VendoraddComponent } from './vendoradd/vendoradd.component';
import { VendoreditComponent } from './vendoredit/vendoredit.component';
import { VendorlistComponent } from './vendorlist/vendorlist.component';
import { PurchaseaddComponent } from './purchaseadd/purchaseadd.component';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { PurchaseeditComponent } from './purchaseedit/purchaseedit.component';
import { AssetmasterComponent } from './assetmaster/assetmaster.component';
import { AssetmasterlistComponent } from './assetmasterlist/assetmasterlist.component';
import { AssetmasterorderComponent } from './assetmasterorder/assetmasterorder.component';
@NgModule({
  declarations: [
    AppComponent,
    AssetlistComponent,
    AssetaddComponent,
    AsseteditComponent,
    LoginComponent,
    VendoraddComponent,
    VendoreditComponent,
    VendorlistComponent,
    PurchaseaddComponent,
    PurchaselistComponent,
    PurchaseeditComponent,
    AssetmasterComponent,
    AssetmasterlistComponent,
    AssetmasterorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      maxOpened: 1,
      autoDismiss: true,
      enableHtml: true
    }), 

    NgxPaginationModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
