import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { BehaviorSubjectService} from './behavior-subject.service';



import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';

import { JewelleryComponent } from './jewellery/jewellery.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { MenfashionComponent } from './menfashion/menfashion.component';
import { WomenfashionComponent } from './womenfashion/womenfashion.component';
import { FilterPipe } from './filter.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminListProductComponent } from './admin-list-product/admin-list-product.component';
import { CartdetailsComponent } from './cartdetails/cartdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Checkout1Component } from './checkout1/checkout1.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'menfashion', component: MenfashionComponent},
    {path: 'womenfashion', component: WomenfashionComponent},
    {path: 'jewellery', component: JewelleryComponent},
    {path: 'electronics', component: ElectronicsComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'product-detail/:SKU', component: ProductDetailComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},   
    {path: 'listProduct', component: AdminListProductComponent},   
    {path: 'addProduct', component: AddProductComponent},   
    {path: 'updateProduct', component: AdminDashboardComponent},   
    {path: 'deleteProduct', component: AdminDashboardComponent},
    {path: 'cart-details',component: CartdetailsComponent},  
    {path: 'checkout/:currentUserName',component: CheckoutComponent},  
    {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenfashionComponent,
    WomenfashionComponent,
    JewelleryComponent,
    ElectronicsComponent,
    FilterPipe,
    ProductDetailComponent,
    LoginFormComponent,
    AddProductComponent,
    AdminDashboardComponent,
    AdminListProductComponent,
    CartdetailsComponent,
    CheckoutComponent,
    Checkout1Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
	FormsModule,
    RouterModule.forRoot(appRoutes)  
  ],
  providers: [DataService,BehaviorSubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
