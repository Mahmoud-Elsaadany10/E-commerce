import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { OrderItem } from '../../model/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: OrderItem[] = [];
  totalPrice: number = 0;
  stripe: any;


  constructor(
    private cartService: CartService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getPrdCart();
  }

  navToHome() {
    this.router.navigate(['/home']);
  }

  getPrdCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartProducts = [...res.cartItems];
        this.totalPrice = res.totalPrice || 0;
      },
      error: () => {
        this.cartProducts = [];
        this.totalPrice = 0;
      }
    });
  }

  updateQuantity(quantity: number, productId: number) {
    if (quantity < 1) return;
    this.cartService.UpdateCart(productId, quantity).subscribe({
      next: () => this.getPrdCart()
    });
  }

  removeFromCart(productId: number) {
    this.cartService.deleteCart(productId).subscribe({
      next: () => this.getPrdCart(),
      error: (err) => console.error('Failed to remove product:', err)
    });
  }

async payment(id: number) {
  const model = { orderId: id };
  this.cartService.payment(model).subscribe({
    next: async (res) => {
      if (res.url) {
        window.location.href = res.url;
      } else {
        console.error('Stripe Checkout URL not found in response');
      }
    },
    error: (err) => {
      console.error('Error creating payment session:', err);
    }
  });
  }

  confirmOrder() {
    this.cartService.confirmOrder().subscribe({
      next: (res) => {
        this.payment(res.orderId);
      },
      error: (err) => console.error('Error confirming order:', err)
    });
  }


}
