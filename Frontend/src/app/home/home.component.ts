import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { ItemlistComponent } from '../itemlist/itemlist.component';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PaginationComponent, ItemlistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  items: any[] = [];
  currentPage: number = 1;
  totalPages = 0;
  itemsPerPage = 10;
  error: any = null;
  
  ngOnInit(): void {
      this.route.queryParamMap.subscribe((params: ParamMap) => {
        const searchItem = params.get('search');
        const pageParam = params.get('page');
        this.currentPage = pageParam ? +pageParam : 1;
        this.fetchItems(searchItem);
      })
  }

  fetchItems(searchItem: string | null): void {
    const itemsObservable = searchItem ? this.apiService.searchItems(searchItem) : this.apiService.getAllItems();

    itemsObservable.subscribe({
      next:(response) => {
        if(response?.itemList && response.itemList.length > 0) {
          this.handleItemsRespone(response.itemList);
        } else {
          this.error = 'Items not found'
        }
      },
      error:(error) => {
        console.log(error);
        this.error = error?.error?.message || "error getting items";
      }
    })
  }

  handleItemsRespone(items: []): void {
    this.totalPages = Math.ceil(items.length / this.itemsPerPage);

    this.items = items.slice(
      (this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage
    )
    console.log(this.items);
  }

  changePage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page},
      queryParamsHandling: 'merge'
    })
  }

}
