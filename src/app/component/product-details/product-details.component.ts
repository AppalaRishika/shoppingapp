import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor() {}
  public productDetails?: ProductDetails;
  ngOnInit(): void {
    this.productDetails = history.state;
    console.log(this.productDetails);
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
