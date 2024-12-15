import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this import

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './productlist/productlist.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { HeaderSaleComponent } from './header-sale/header-sale.component';
import { DealsComponent } from './deals/deals.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { SignInAdminComponent } from './sign-in-admin/sign-in-admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutModalComponent } from './checkout-modal/checkout-modal.component';
import { LoginComponent } from './login/login.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDialogComponent,
    HeaderSaleComponent,
    DealsComponent,
    CartComponent,
    HomeComponent,
    SignInComponent,
    UploadComponent,
    SignInAdminComponent,
    DeleteDialogComponent,
    ProductDetailsComponent,
    CheckoutModalComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatIconModule, // Add HttpClientModule here
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
