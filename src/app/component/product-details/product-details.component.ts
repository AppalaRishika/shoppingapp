import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}
  public productDetails?: ProductDetails;

  ngOnInit(): void {
    this.productDetails = history.state;
    console.log(this.productDetails);
  }
  addtocart(productDetails: ProductDetails) {
    this.cartService.addtoCart(this.productDetails);
    this.router.navigateByUrl('/cart', { state: productDetails });
  }
}
export interface ProductDetails {
  category: string;
  description: string;
  id: number;
  image: string;
  navigationId: number;
  price: number;
  quantity: number;
  rating: { rate: number; count: number };
  title: string;
  total: number;
}
