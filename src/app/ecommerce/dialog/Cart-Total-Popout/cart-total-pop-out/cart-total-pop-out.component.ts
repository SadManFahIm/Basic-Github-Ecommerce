import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { EcommerceComponent } from 'src/app/ecommerce/ecommerce.component';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { SiblingService } from 'src/app/ecommerce/sibling.service';
import { SubscriptionsContainer } from 'src/app/ecommerce/subscriptions-container';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-cart-total-pop-out',
  templateUrl: './cart-total-pop-out.component.html',
  styleUrls: ['./cart-total-pop-out.component.css']
})
export class CartTotalPopOutComponent implements OnInit, OnDestroy {
  cartInfo: any;
  priceAndQuantity: any;
  public subs = new SubscriptionsContainer();

  constructor( private sibService: SiblingService,
               private bottomSheetRef: MatBottomSheetRef<EcommerceComponent>,
             ) { }

  ngOnInit(): void {
    this.subs.add = this.sibService.sendData.subscribe((datas: any) => {
      this.cartInfo = datas.cartData;
    });

    this.subs.add = this.sibService.totalPrice.subscribe((data: any) => {
      this.priceAndQuantity = data.TotalQuantityAndPrice;
    });
    const TotalPriceAndQuantity = JSON.parse(localStorage.getItem('TotalPriceAndQuantity'));
    const products = JSON.parse(localStorage.getItem('productsInCart'));

    if (products){
      if (this.cartInfo !== ''){
        this.cartInfo = Object.values(products);
      }
    }else{
      this.cartInfo = '';
    }

    if (TotalPriceAndQuantity) {
      if (this.priceAndQuantity !== ''){
        this.priceAndQuantity = TotalPriceAndQuantity;
      }
    }else{
      this.priceAndQuantity = '';
    }
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onClickItem(item: any, action: string): void {
    const allProducts = JSON.parse(localStorage.getItem('ProductsDataAdded'));
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let totalQuantity = 0;
    let totalPrice = 0;
    let quantity: any;
    if (action === 'add'){
     quantity = ++(item.quantity);
    }

    if (action === 'remove'){
      if (item.quantity > 0) {
        quantity = --(item.quantity);
      } else {
        quantity = 0;
      }
      if (item.quantity === 0){
        delete cartItems[item.id];
      }
    }
    this.productType(allProducts, item, quantity);
    this.productType(cartItems, item, quantity);

    Object.values(cartItems).map((element: any) => {
      totalQuantity += element.quantity;
      totalPrice += element.quantity * element.price;
    });
    const TotalPriceAndQuantity = {
      totalQuantity,
      totalPrice
    };
    this.sibService.communicateData(allProducts, Object.values(cartItems), Object.values(cartItems).length);
    this.sibService.communicateTotalPrice(TotalPriceAndQuantity);
    localStorage.setItem('TotalPriceAndQuantity', JSON.stringify(TotalPriceAndQuantity));
    localStorage.setItem('ProductsDataAdded', JSON.stringify(allProducts));
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    localStorage.setItem('cartLengths', JSON.stringify(Object.values(cartItems).length));
  }

  productType(Products: any, item: any, quantity: any): void {
    Object.values(Products).map((element: any) => {
      if (element.id === item.id) {
        element.id = item.id;
        element.productname = item.productname;
        element.price = item.price;
        element.imageurl = item.imageurl;
        element.quantity = quantity;
        element.favorite = item.favorite;
      }
    });
  }


}
