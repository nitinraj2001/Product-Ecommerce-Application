import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: CartItem[]=[];

  totalPrice : Subject<number>=new Subject<number>();

  totalQuantity : Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    let cartExistingItem: CartItem=undefined;
    let isExitInCart: boolean=false;

    if(this.cartItem.length>0){
     cartExistingItem= this.cartItem.find(tempCartItem=>tempCartItem.id==theCartItem.id);

     isExitInCart=(cartExistingItem!=undefined);

    }

    if(isExitInCart){
      cartExistingItem.quantity++;
    }
    else{
      this.cartItem.push(theCartItem);
    }

    this.calculateTotalPrice();
    
  }
  calculateTotalPrice() {
    let totalPriceValue: number=0;

    let totalQuantityValue: number=0;

    for(let currentcartItem of this.cartItem){
      totalPriceValue+=currentcartItem.quantity*currentcartItem.unitPrice;
      totalQuantityValue+=currentcartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    console.log(`total price in cart is :${totalPriceValue} and total quantity in cart is :${totalQuantityValue}`)
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity==0){
      this.remove(cartItem);
    }
    this.calculateTotalPrice();
  }

  remove(cartItem: CartItem){

    const cartItemIndex=this.cartItem.findIndex((tempCartItem)=>tempCartItem.id==cartItem.id);

    if(cartItemIndex>-1){
      this.cartItem.splice(cartItemIndex,1);
      this.calculateTotalPrice();
    }

  }
}
