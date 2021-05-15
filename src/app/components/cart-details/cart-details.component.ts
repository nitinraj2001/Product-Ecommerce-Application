import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[]=[];

  totalPrice: number;

  totalQuantity: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.showcartdetails();
  }
  showcartdetails() {
    this.cartItems=this.cartService.cartItem;
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);
    this.cartService.calculateTotalPrice();
  }

  incrementQuantity(cartItem: CartItem){
    console.log("cartItem is added in your cart",cartItem);
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem){
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem){
    this.cartService.remove(cartItem);
  }

}
