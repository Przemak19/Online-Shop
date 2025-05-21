import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [PaginationComponent, CommonModule],
  templateUrl: './admin-item.component.html',
  styleUrl: './admin-item.component.css'
})
export class AdminProductComponent implements OnInit {

  items: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 10;
  error: any = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
      this.fetchItems();
  }

  fetchItems(): void {
    const itemsObservable = this.apiService.getAllItems();

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

  OnPageChange(page: number): void {
    this.currentPage = page;
    this.fetchItems();
  }

  handleAdd(): void {
    this.router.navigate([`/admin/add-item`]);
  }

  handleEdit(productId: string): void {
    this.router.navigate([`/admin/edit-item/${productId}`]);
  }

  handleDelete(id: string): void {
    const confirm = window.confirm("Do you really want to delete this item?");

    if(confirm) {
      this.apiService.deleteItem(id).subscribe({
        next: (response) => {
          console.log('halo');
          this.fetchItems();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  
}


