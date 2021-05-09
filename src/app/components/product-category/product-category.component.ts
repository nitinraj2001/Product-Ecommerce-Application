import { ProductCategory } from './../../common/product-category';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories : ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategory();
  }

  listProductCategory(){
    this.productService.getProductCategory().subscribe(data=>{this.productCategories=data})
  }

}
