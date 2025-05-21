import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-editcategory',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-editcategory.component.html',
  styleUrl: './admin-editcategory.component.css'
})
export class AdminEditcategoryComponent implements OnInit{
  
    categoryForm: FormGroup;
    message: any = null;
    categoryId: string = ''
  
    constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private route: ActivatedRoute) {
      this.categoryForm = this.fb.group({
        name: ['', Validators.required]
      })
    }
  
  ngOnInit(): void {
      this.categoryId = this.route.snapshot.paramMap.get("categoryId") || '';
      this.fetchCategoryById();
  }

  fetchCategoryById(): void {
    if(this.categoryId) {
      this.apiService.getCategoryById(this.categoryId).subscribe({
        next: (response) => {
          this.categoryForm.patchValue({name: response.category.name})
        },
        error: (err) => {
          console.log(err);
          this.message = err?.error?.message || 'cannot find category by id';
        }
      })
    }
  }

    handleSubmit(): void {
      if(this.categoryForm.valid) {
        this.apiService.updateCategory(this.categoryId, this.categoryForm.value).subscribe({
          next: (response) => {
            if(response.status === 200) {
              this.message = "Category updated";
              setTimeout(() => {
                this.message = null;
                this.router.navigate(['/admin/categories']);
              }, 3000)
            }
          },
          error: (err) => {
            console.log(err);
            this.message = err?.error?.message || 'cannot to update category';
          }
        })
      }
    }
  
    handleBack(): void {
      this.router.navigate(['/admin/categories']);
    }
}
