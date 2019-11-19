import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AssetaddComponent } from './assetadd/assetadd.component';
import { AssetlistComponent } from './assetlist/assetlist.component';
import { AsseteditComponent } from './assetedit/assetedit.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'assetadd',component:AssetaddComponent},
  {path:'assetlist',component:AssetlistComponent},
  {path:'assetedit',component:AsseteditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
