import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SiblingService } from 'src/app/ecommerce/sibling.service';

@Component({
  selector: 'app-addorremove',
  templateUrl: './addorremove.component.html',
  styleUrls: ['./addorremove.component.css']
})
export class AddorremoveComponent implements OnInit, OnChanges{

  @Input() quantity: number;
  // public afterAddedItems: any;
  // public cartCount: any;
  // public cartInfo: any;
  constructor(private sibService: SiblingService) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    // this.sibService.sendData.subscribe((data: any) => {
    //   this.cartCount = data.cartItemCount;
    //   if (this.cartInfo !== ''){
    //     this.cartInfo = data.data;
    //   }
    // });
  }

}
