import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { BasketService } from '../service/basket.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit{

  constructor(private apiService: ApiService, private basketService: BasketService, private router: Router) {}

  basket: any[] = []
  message: any = null
  totalPrice: number = 0

  ngOnInit(): void {
      this.loadBasket()
  }

  loadBasket(): void {
    this.basket = this.basketService.getBasket()
    this.calculateTotalPrice()
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.basket.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  incrementItem(itemId: number): void {
    this.basketService.incrementItem(itemId)
    this.loadBasket()
  }

 decrementItem(itemId: number): void {
    this.basketService.decrementItem(itemId)
    this.loadBasket()
  }

  removeItem(itemId:number) {
    this.basketService.removeItem(itemId)
    this.loadBasket()
  }

  clearBasket(): void {
    this.basketService.clearBasket()
    this.loadBasket()
  }

  handleBuy(): void {
    if(!this.apiService.isAuthenticated()) {
      this.message = 'Please login in first'
      setTimeout(() => {
        this.message = null
        this.router.navigate(['/login'])
      }, 3000)
      return;
    }

    const orderItems = this.basket.map(item =>({
      itemId: item.id,
      quantity: item.quantity
    }));
  
    const orderRequest = {
      totalPrice: this.totalPrice,
      items: orderItems
    };

    this.apiService.createOrder(orderRequest).subscribe({
      next: (response) => {
        this.message = response.message
        if(response.status === 200) {
          this.basketService.clearBasket();
          this.loadBasket();
        }
      },
      error: (err) => {
        this.message = err?.error?.message || 'cannot place order'
      }
    });
  }

}
