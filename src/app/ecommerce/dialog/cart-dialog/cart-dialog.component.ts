import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EcommerceComponent } from '../../ecommerce.component';
import { ProductForm } from '../product-form';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SiblingService } from '../../sibling.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {

  public productModel: FormGroup;
  public products: any = {};

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: EcommerceComponent,
      private formbuilder: FormBuilder,
      private sibService: SiblingService
    ) { }

  ngOnInit(): void {
    this.productModel = this.formbuilder.group({
      id: uuidv4(),
      productname: [null, Validators.required],
      price: [0, Validators.required],
      imageurl: [null, Validators.required],
      quantity: 0,
      favorite: false,
    });
  }

  get NameOfProduct(): any { return this.productModel.get('productname'); }
  get Price(): any { return this.productModel.get('price'); }
  get ImageUrl(): any { return this.productModel.get('imageurl'); }

  SaveProducts(): void{
    this.products = Object.assign(this.products, this.productModel.value);
    this.addProducts(this.products);
  }

  addProducts(product: any): void{
    let allproducts = [];

    if (localStorage.getItem('ProductsDataAdded')){
      allproducts = JSON.parse(localStorage.getItem('ProductsDataAdded'));
      allproducts = [...allproducts, product];
    }else{
      allproducts = [product];
    }
    localStorage.setItem('ProductsDataAdded', JSON.stringify(allproducts));

    this.sibService.communicateProductsData(allproducts);

  }

}
