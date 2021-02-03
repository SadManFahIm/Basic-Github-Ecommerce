import { Component, OnInit, OnDestroy, } from '@angular/core';
import { SiblingService } from '../sibling.service';
import {SubscriptionsContainer} from '../subscriptions-container';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , OnDestroy {

  public fav = false;
  public products: any;
  public task = '';
  public FoundFav: any;
  public NotFoundFav: any;
  public isFav = false;
  public isNotFav = false;
  public allItems = true;
  searchByName = '';
  public subs = new SubscriptionsContainer();
  public pageSlice: any;
  constructor(private sibService: SiblingService) {}

  ngOnInit(): void {
    this.subs.add = this.sibService.sendData.subscribe((data: any) => {
      if (this.products !== ''){
        this.DataStorage(data);
      }
    });
    this.subs.add = this.sibService.favoriteData.subscribe((data: any) => {
      if (this.products !== ''){
        this.DataStorage(data);
      }
    });
    const products = JSON.parse(localStorage.getItem('ProductsDataAdded'));
    if (products){
      this.products = products;
      this.pageSlice = this.products.slice(0, 4);
    }else{
      this.products = '';
    }
  }


  ngOnDestroy(): void {
    this.subs.dispose();
  }

  DataStorage(data: any): void{
    this.products = data.data;
    this.FoundFav = data.data.filter((element: any) => element.favorite === true);
    this.NotFoundFav = data.data.filter((element: any) => element.favorite === false);
    this.pageSlice = this.products.slice(0, 4);
  }

  AddToCard(item: any): void{
    const a = JSON.parse(localStorage.getItem('ProductsDataAdded'));
    a.map((data: any) => {
      if (data.id === item.id){
        data.quantity++;
      }
    });
    localStorage.setItem('ProductsDataAdded', JSON.stringify(a));
    this.OnClick_CartOrIncOrDec(item, null, a);
  }

  IncrementOrDecrement(item: any, incOrDec: any): void{
    const a = JSON.parse(localStorage.getItem('ProductsDataAdded'));

    if (incOrDec && incOrDec === 'inc'){
      a.map((data: any) => {
        if (data.id === item.id){
          data.quantity++;
        }
      });
    }
    if (incOrDec && incOrDec === 'dec'){
      a.map((data: any) => {
        if (data.id === item.id){
          if (data.quantity > 0){
            data.quantity--;
          }
        }
      });
    }
    localStorage.setItem('ProductsDataAdded', JSON.stringify(a));
    this.OnClick_CartOrIncOrDec(item, incOrDec, a);
  }

  OnClick_CartOrIncOrDec(item: any, incOrDec: any, a: any): void {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let totalQuantity = 0;
    let totalPrice = 0;
    if (cartItems !== null){
      if (cartItems[item.id] === undefined){
        cartItems = {
          ...cartItems,
          [item.id]: item
        };
      }
      if (incOrDec && incOrDec === 'inc'){
        if (cartItems[item.id]){
            ++(cartItems[item.id].quantity);
        }
      }else if (incOrDec && incOrDec === 'dec'){
        if (cartItems[item.id] && cartItems[item.id].quantity > 0){
            --(cartItems[item.id].quantity);
        }
        if (cartItems[item.id] && cartItems[item.id].quantity === 0){
          delete cartItems[item.id];
        }
      }else {
        cartItems[item.id].quantity++;
      }
    }else{
      item.quantity = 1;
      cartItems = {
        [item.id]: item
      };
    }
    Object.values(cartItems).map((element: any) => {
      totalQuantity += element.quantity;
      totalPrice += element.quantity * element.price;
    });
    const TotalPriceAndQuantity = {
      totalQuantity,
      totalPrice
    };
    this.sibService.communicateData(a, Object.values(cartItems), Object.values(cartItems).length);
    this.sibService.communicateTotalPrice(TotalPriceAndQuantity);
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    localStorage.setItem('TotalPriceAndQuantity', JSON.stringify(TotalPriceAndQuantity));
    localStorage.setItem('cartLengths', JSON.stringify(Object.values(cartItems).length));
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.products.length){
      endIndex = this.products.length;
    }
    this.pageSlice = this.products.slice(startIndex, endIndex);
  }

  AddToFavorite(item: any): void{
    const a = JSON.parse(localStorage.getItem('ProductsDataAdded'));
    a.map((data: any) => {
      if (data.id === item.id){
        data.favorite ? data.favorite = false : data.favorite = true;
      }
    });

    this.sibService.communicateFavorite(a);
    localStorage.setItem('ProductsDataAdded', JSON.stringify(a));
  }

  onChoices(item: any): void {
    if (item === 'all') {
      this.isFav = false;
      this.isNotFav = false;
      this.allItems = true;
    }

    if (item === 'fav'){
      this.isNotFav = false;
      this.allItems = false;
      this.isFav = true;
      const found = this.products.filter((element: any) => element.favorite === true);
      this.FoundFav = found;
    }

    if (item === 'notfav'){
      this.isFav = false;
      this.allItems = false;
      this.isNotFav = true;
      const found = this.products.filter((element: any) => element.favorite === false);
      this.NotFoundFav = found;
    }
  }
}
