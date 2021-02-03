import { Component, OnInit, Inject } from '@angular/core';
import { ManagementComponent } from 'src/app/ecommerce/management/management.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiblingService } from 'src/app/ecommerce/sibling.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ManagementComponent, private sibService: SiblingService) { }

  ngOnInit(): void {
  }
  DeleteItem(): void {
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    const found = this.data.product.findIndex((element: any) => {
      return element.id === this.data.id;
    });
    this.data.product.splice(found, 1);
    const foundCartItem = Object.values(cartItems).findIndex((element: any) => {
      return element.id === this.data.id;
    });
    if (foundCartItem >= 0) {
      delete cartItems[this.data.id];
    }
    this.sibService.communicateData(this.data.product, Object.values(cartItems), Object.values(cartItems).length);
    localStorage.setItem('ProductsDataAdded', JSON.stringify(this.data.product));
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    localStorage.setItem('cartLengths', JSON.stringify(Object.values(cartItems).length));
  }

}
