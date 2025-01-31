import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { BasketService } from '../service/basket.service';
import { ActivatedRoute} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itemdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itemdetails.component.html',
  styleUrl: './itemdetails.component.css'
})
export class ItemdetailsComponent implements OnInit{
  constructor(private apiService: ApiService, private basketService: BasketService, private route: ActivatedRoute) {}

  item: any = null;
  basketItem: any = null;
  itemId: any = null;
  error: any = null;

  ngOnInit(): void {
      this.itemId = this.route.snapshot.paramMap.get('itemId');
      this.fetchItem();
  }

  async fetchItem() {
    if(this.itemId) {
      this.apiService.getItemById(this.itemId).pipe(
        catchError(error => {
          this.error = error.message;
          return of(null);
        }),
        map(response => response.item)
      ).subscribe(prod => {
        this.item = prod;
        this.basketItem = this.basketService.getBasketItem(Number(this.itemId));
      })
    }
  }

  addToBasket() {
    if(this.itemId) {
      this.basketService.addItem(this.item);
      this.basketItem = this.basketService.getBasketItem(this.item.id);
    }
  }

  incrementItem() {
    if(this.item && this.basketItem) {
      this.basketService.incrementItem(this.item.id);
      this.basketItem = this.basketService.getBasketItem(this.item.id);
    }
  }

  decrementItem() {
    if(this.item && this.basketItem && this.basketItem.quantity > 1) {
      this.basketService.decrementItem(this.item.id);
    } else {
      this.basketService.removeItem(this.item.id);
    }

    this.basketItem = this.basketService.getBasketItem(this.item.id);
  }

}
