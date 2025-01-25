import { Component, Input } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Item {
  id: string,
  name: string,
  description: string,
  imageUrl:string,
  price: number
}

@Component({
  selector: 'app-itemlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itemlist.component.html',
  styleUrl: './itemlist.component.css'
})
export class ItemlistComponent {

  constructor(private basketService: BasketService, private router: Router) {}

   @Input() items: Item[] = []

  addToBasket(item: Item): void {
    this.basketService.addItem(item);
  }

  incrementItem(item: Item): void {
    this.basketService.incrementItem(Number(item.id));
  }

  decrementItem(item: Item): void {
    this.basketService.decrementItem(Number(item.id));
  }

  isInBasket(item: Item): boolean {
    return this.basketService.getBasket().some(prod => prod.id === item.id);
  }

  getBasketItem(item: Item): any {
    return this.basketService.getBasket().find(prod => prod.id === item.id);
  }

  changeToItemDetails(itemId: string): void {
    this.router.navigate(['/item', itemId]);
  }
}
