import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {

  categories: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.apiService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.categoryList || []
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  handleEdit(id: string): void {
    this.router.navigate([`/admin/edit-category/${id}`]);
  }

  handleDelete(id: string): void {
    const confirm = window.confirm("Do you really want to delete this category?");

    if(confirm) {
      this.apiService.deleteCategory(id).subscribe({
        next: (response) => {
          this.fetchCategories();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  handleAddCategory(): void {
    this.router.navigate([`admin/add-category`]);
  }

}
