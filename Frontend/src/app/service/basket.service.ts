import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket: any[] = [];

  constructor() {
    const savedBasket = localStorage.getItem('basket');
    this.basket = savedBasket ? JSON.parse(savedBasket) : [];
  }

  getBasket(){
    return this.basket;
  }

  getBasketItem(itemId: number) {
    return this.basket.find(basketItem => basketItem.id === itemId);
  }

  private saveBasket() {
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  addItem(item:any) {
    const existigItem = this.getBasketItem(item.id);

    if(existigItem) {
      existigItem.quantity += 1;
    } else {
      this.basket.push({...item, quantity: 1})
    }
  }

  removeItem(itemId:number) {
    this.basket = this.basket.filter(item => item.id !== itemId);
    this.saveBasket();
  }

  incrementItem(itemId: number) {
    const item = this.getBasketItem(itemId);

    if(item) {
      item.quantity += 1;
      this.saveBasket();
    }
  }

  decrementItem(itemId: number) {
    const item = this.getBasketItem(itemId);

    if(item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveBasket();
    } else {
      this.removeItem(itemId);
    }
  }

  clearBasket() {
    this.basket = [];

    localStorage.removeItem('basket');
  }
}
