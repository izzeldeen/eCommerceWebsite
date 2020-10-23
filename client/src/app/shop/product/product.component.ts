import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/modules/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
@Input() product: IProduct[];
@Output() titleproduct = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  

  gettitlevalue(){
    this.titleproduct.emit('product Shop');
  }

}
