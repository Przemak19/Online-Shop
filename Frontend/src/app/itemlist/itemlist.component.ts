import { Component } from '@angular/core';
import { BasketService } from '../service/basket.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itemlist.component.html',
  styleUrl: './itemlist.component.css'
})
export class ItemlistComponent {

  constructor(readonly basketService: BasketService) {}

}
