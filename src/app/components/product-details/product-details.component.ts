import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  productId: number;

  constructor(private ProductService: ProductService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(()=>this.getProductById())
  }

  getProductById(){
    this.productId=+this.router.snapshot.paramMap.get("id");
    this.ProductService.getProduct(this.productId).subscribe(data=>this.product=data);
  }

}
