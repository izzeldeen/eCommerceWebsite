import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ICategory, IProduct } from '../modules/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  CasheKey = 'Products';
  products: IProduct[];
  categories: ICategory[];
  product: IProduct;
  titleshop: string;
  constructor(private shopServices: ShopService) {}
  ngOnInit(): void {
    this.getProduct();
  }
  // getProduct() {
  //   if (localStorage.getItem(this.CasheKey) !== "null" ) {
  //     console.log('from the If block');
  //     this.products = JSON.parse(localStorage[this.CasheKey]);
  //   }
  //   else
  //   {
  //     this.shopServices.getProducts().subscribe(response => {
  //       this.products = response;
  //       localStorage[this.CasheKey] = JSON.stringify(response);
  //       console.log(response);
  //     }, error => {
  //       console.log(error);
  //     });
  //   }
  // }

  getProduct(): any {
    this.shopServices.getProducts().subscribe(response => {
      this.products = response;

    }, error => {
      console.log(error);
    });
  }
  getCategories(): any {
    this.shopServices.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductById(id: number): any {
    this.shopServices.getProductById(id).subscribe(
      (response) => {
        this.product = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  OnSearch(event): any {
    if (event.target.value === '' || event.target.value === null) {
      this.shopServices.getProducts().subscribe(
        (response) => {
          this.products = response;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.shopServices.searchForProduct(event.target.value).subscribe(
        (response) => {
          this.products = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
