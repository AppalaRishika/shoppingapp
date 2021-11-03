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
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });

    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
  viewProductDetails(item: any) {
    this.router.navigateByUrl('/product-details', { state: item });
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
    this.router.navigateByUrl('/cart', { state: item });
  }
}
