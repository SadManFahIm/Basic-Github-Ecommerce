import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SiblingService } from './sibling.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { CartTotalPopOutComponent } from './dialog/Cart-Total-Popout/cart-total-pop-out/cart-total-pop-out.component';
import { SubscriptionsContainer } from './subscriptions-container';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public cartCount: any;
  public cartInfo: any;
  public sum = 0;
  public totalQuantity = 0;
  public totalPrice: any;

  @Input()
  routerLinkActive: string | string[];
  public subs = new SubscriptionsContainer();

  constructor(private breakpointObserver: BreakpointObserver,
              private sibService: SiblingService,
              private bottomSheet: MatBottomSheet
              ) {}


  ngOnInit(): void {
    this.subs.add = this.sibService.sendData.subscribe((data: any) => {
      this.cartCount = data.cartItemCount;
      if (this.cartInfo !== ''){
        this.cartInfo = data.cartData;
        console.log(this.cartInfo);
      }
    });
    const cartNumbers = JSON.parse(localStorage.getItem('cartLengths'));
    if (cartNumbers){
      this.cartCount = cartNumbers;
    }else{
      this.cartCount = 0;
    }
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(CartTotalPopOutComponent, {
      data: {
        totalquantity: this.totalQuantity,
        totalprice: this.totalPrice
      }
    });
  }
}
