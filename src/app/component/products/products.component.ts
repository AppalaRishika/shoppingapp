import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public totalItem: number = 0;
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  constructor(
    private api: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((result) => {
      this.productList = result;
      this.filterCategory = result;
      this.productList.forEach((product: any) => {
        if (
          product.category === "women's clothing" ||
          product.category === "men's clothing"
        ) {
          product.category = 'fashion';
        }
        Object.assign(product, { quantity: 1, total: product.price });
      });
    });

    this.cartService.getProducts().subscribe((result) => {
      this.totalItem = result.length;
    });
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((product: any) => {
      if (product.category == category || category == '') {
        return product;
      }
    });
  }
  viewProductDetails(item: any) {
    this.router.navigateByUrl('/product-details', { state: item });
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
}
