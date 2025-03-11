import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { ItemlistComponent } from '../itemlist/itemlist.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-items',
  standalone: true,
  imports: [PaginationComponent, ItemlistComponent, CommonModule],
  templateUrl: './category-items.component.html',
  styleUrl: './category-items.component.css'
})
export class CategoryItemsComponent implements OnInit{
  
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  items: any[] = [];
  currentPage: number = 1;
  totalPages = 0;
  itemsPerPage = 10;
  error: any = null;

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const categoryId = params['categoryId']
        if(categoryId) {
          this.fetchItemsByCategory(categoryId);
        }
      })
  }

  fetchItemsByCategory(categoryId: string): void{
    this.apiService.getItemsByCategoryId(categoryId).subscribe({
      next: (response) => {
        const allItems = response.itemList || []
        this.totalPages = Math.ceil(allItems.length / this.itemsPerPage)
        this.items = allItems.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      },
      error: (err) => {
        this.error = err?.error?.message || 'cannot get itmes by category'
      }
    })
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    const categoryId = this.route.snapshot.params['categoryId']
    this.fetchItemsByCategory(categoryId)
  }
  
}
