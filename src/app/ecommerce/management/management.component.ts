import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CartDialogComponent} from '../dialog/cart-dialog/cart-dialog.component';
import { SiblingService } from '../sibling.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubscriptionsContainer } from '../subscriptions-container';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, OnDestroy {
  [x: string]: any;
  products: any;
  // public TeamInterFace: TeamApis[ ];
  public displayedColumns: string[] = ['NAME', 'PRICE', 'IMAGE', 'EDIT', 'DELETE'];
  public result = new MatTableDataSource<any>([]);
  public subs = new SubscriptionsContainer();
  cartItems: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private sibService: SiblingService) { }

  ngOnInit(): void {
    this.result.paginator = this.paginator;

    this.subs.add = this.sibService.sendProductData.subscribe((data: any) => {
      this.result.data = data;
    });
    const products = JSON.parse(localStorage.getItem('ProductsDataAdded'));

    this.subs.add = this.sibService.sendData.subscribe((data: any) => {
      this.result.data = data.data;
    });

    if (products){
      this.products = products;
    }else{
      this.products = 'There is no products';
    }
    this.result.data = this.products;
  }


  ngOnDestroy(): void {
    this.subs.dispose();
  }

  openDialog(): void{
    this.dialog.open(CartDialogComponent);
  }

  onEditOrDeleteAction(id: any, action: string, productname: string): void{
    const product = JSON.parse(localStorage.getItem('ProductsDataAdded'));
    if (action === 'delete'){
      this.dialog.open(DeleteDialogComponent, {
        data: {
          id,
          product,
          productname,
        }
      });
    }
    if (action === 'edit'){
      this.dialog.open(EditDialogComponent, {
        data: {
          id: id.id,
          imageUrl: id.imageurl,
          price: id.price,
          productName: id.productname,
          favorite: id.favorite,
          quantity: id.quantity
        }
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.result.filter = filterValue.trim().toLowerCase();
  }

}
