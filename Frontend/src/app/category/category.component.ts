import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent implements OnInit{

  error: any = null;
  categories: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
      this.fetchCategories();
  }

  fetchCategories(): void {
    this.apiService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.categoryList || []
      },
      error: (err) => {
        this.error = err?.error?.message || 'cannot get categories'
      }
    })
  }

  handleCategoryClick(categoryId: number): void {
    this.router.navigate(['/items', categoryId])
  }
}
