import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number=1;
  previousCategoryId: number = 1;
  pageOfItems: Array<Product>;
  itemsize: number=6;
  thePageNumber: number = 1;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,private cartservice: CartService, private router :ActivatedRoute,private config:NgbPaginationConfig,private ngxservice: NgxSpinnerService) {
    config.maxSize=3;
    config.boundaryLinks=true;
   }


  ngOnInit() {
    this.router.paramMap.subscribe(()=>this.listProducts())
  }
  listProducts(){

    this.ngxservice.show();

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

    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;
    this.productService.getProductListPaginate(this.thePageNumber - 1,this.itemsize,this.currentCategoryId).subscribe(this.processResult());


  }

  handleSearchlists(){

    const searchkeyword: string=this.router.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(searchkeyword,this.thePageNumber-1,this.itemsize).subscribe(this.processResult());

  }

  pageClick(pageOfItems: Array<Product>){
    this.pageOfItems=pageOfItems;
  }

  updatePageSize(itemsize: number){
    this.itemsize=itemsize;
    this.thePageNumber=1;
    this.listProducts();
  }

  processResult() {
    return data => {
      this.ngxservice.hide();
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.itemsize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(product: Product){
     console.log(`product name: ${product.name} added to your cart it will cost u ${product.unitPrice}`);
     const theCartItem=new CartItem(product);
     this.cartservice.addToCart(theCartItem);
  }

}
