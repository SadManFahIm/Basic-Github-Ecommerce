import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule, routeComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataApiService} from './data-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './ecommerce/home/home.component';
import { ManagementComponent } from './ecommerce/management/management.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CartDialogComponent } from './ecommerce/dialog/cart-dialog/cart-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddorremoveComponent } from './ecommerce/home/AddOrRemove/addorremove/addorremove.component';
import { DeleteDialogComponent } from './ecommerce/dialog/delete-dialog/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './ecommerce/dialog/edit-dialog/edit-dialog/edit-dialog.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CartTotalPopOutComponent } from './ecommerce/dialog/Cart-Total-Popout/cart-total-pop-out/cart-total-pop-out.component';
import { FilterPipe } from './ecommerce/filter.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    routeComponent,
    EcommerceComponent,
    HomeComponent,
    ManagementComponent,
    CartDialogComponent,
    AddorremoveComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    CartTotalPopOutComponent,
    FilterPipe,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    FlexLayoutModule
  ],
  providers: [DataApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }