import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  pageOfItems: Array<Product>;
  itemsize: number=6;

  constructor(private productService: ProductService, private router :ActivatedRoute) { }


  ngOnInit() {
    this.router.paramMap.subscribe(()=>this.listProducts())
  }
  listProducts(){

    const searchStatus : boolean=this.router.snapshot.paramMap.has('keyword');

    if(searchStatus){
      this.handleSearchlists()
    }

    else{
      this.handleproductlists();
    }
    
  }

  handleproductlists(){

    const hasCategoryId: boolean=this.router.snapshot.paramMap.has('id');
    console.log("id would be like",this.router.snapshot.paramMap.get('id'));
    if(hasCategoryId){
      this.currentCategoryId=parseInt(this.router.snapshot.paramMap.get('id'));
    }
    else{
      this.currentCategoryId=1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products=data;
      }

    )

  }

  handleSearchlists(){

    const searchkeyword: string=this.router.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(searchkeyword).subscribe(data=>this.products=data);

  }

  pageClick(pageOfItems: Array<Product>){
    this.pageOfItems=pageOfItems;
  }

  updatePageSize(itemsize: number){
    this.itemsize=itemsize;
  }

}
