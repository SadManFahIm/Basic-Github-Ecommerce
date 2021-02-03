import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagementComponent } from 'src/app/ecommerce/management/management.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiblingService } from 'src/app/ecommerce/sibling.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public productModel: FormGroup;
  public product: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: ManagementComponent,
              private formbuilder: FormBuilder,
              private sibService: SiblingService
            ) { }

  ngOnInit(): void {
    this.productModel = this.formbuilder.group({
      id: this.data.id,
      productname: [this.data.productName, Validators.required],
      price: [this.data.price, Validators.required],
      imageurl: [this.data.imageUrl, Validators.required],
      quantity: this.data.quantity,
      favorite: this.data.favorite,
    });
  }

  get NameOfProduct(): any { return this.productModel.get('productname'); }
  get Price(): any { return this.productModel.get('price'); }
  get ImageUrl(): any { return this.productModel.get('imageurl'); }


  EditProduct(): void {
    this.product = Object.assign(this.product, this.productModel.value);
    this.addProducts(this.product);
  }
  addProducts(product: any): void {
    const allProducts = JSON.parse(localStorage.getItem('ProductsDataAdded'));
    allProducts.map((element: any) => {
      if (element.id === this.data.id) {
        element.id = product.id;
        element.productname = product.productname;
        element.price = product.price;
        element.imageurl = product.imageurl;
        element.quantity = product.quantity;
        element.favorite = product.favorite;
      }
    });
    this.sibService.communicateProductsData(allProducts);
    localStorage.setItem('ProductsDataAdded', JSON.stringify(allProducts));
  }

}
