import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl="http://localhost:9090/api/products";
  private categoryUrl="http://localhost:9090/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryid: number): Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/categoryid?id=${categoryid}`
    return  this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(keyword: string): Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/searchbykeyword?name=${keyword}`
    return  this.getProducts(searchUrl);
  }

  getProductCategory(): Observable<ProductCategory[]>{
    return  this.httpClient.get<GetProductCategory>(this.categoryUrl).pipe(
      map( response =>response._embedded.productCategory)
    );
  }

  getProduct(id: number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

 
}

interface GetResponse{

  _embedded :{
    products: Product[];
  }

}

interface GetProductCategory{

  _embedded :{
    productCategory: ProductCategory[];
  }

}
