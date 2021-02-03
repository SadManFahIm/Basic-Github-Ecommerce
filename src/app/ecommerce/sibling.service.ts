import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiblingService {
  sendData = new Subject();
  sendPaginationData = new Subject();
  sendProductData = new Subject();
  favoriteData = new Subject();
  totalPrice = new Subject();
  constructor() { }

  communicateData(data: any, cartData: any, cartItemCount: any): void{
    // tslint:disable-next-line: object-literal-key-quotes
    this.sendData.next({'data': data, 'cartData': cartData, 'cartItemCount': cartItemCount});
  }

  comunicatePaginationData(startIndex: any, endIndex: any): void {
    // tslint:disable-next-line: object-literal-key-quotes
    this.sendPaginationData.next({'startIndex': startIndex, 'endIndex': endIndex});
  }

  communicateFavorite(data: any): void{
    // tslint:disable-next-line: object-literal-key-quotes
    this.favoriteData.next({'data': data});
  }

  communicateProductsData(data: any): void{
    this.sendProductData.next(data);
  }

  communicateTotalPrice(TotalQuantityAndPrice: any): void{
     // tslint:disable-next-line: object-literal-key-quotes
    this.totalPrice.next({'TotalQuantityAndPrice': TotalQuantityAndPrice});
  }


}
