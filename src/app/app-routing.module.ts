import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule,Routes} from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path:"products/:id", component:ProductDetailsComponent},
  {path:"products", component:ProductListComponent},
  {path:"search/:keyword", component:ProductListComponent},
  {path:"category/:id",component:ProductListComponent},
  {path:"",redirectTo:"products",pathMatch:"full"},
  {path:"**",component:PageNotFoundComponent}
];


@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
