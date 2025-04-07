import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-addcategory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-addcategory.component.html',
  styleUrl: './admin-addcategory.component.css'
})
export class AdminAddcategoryComponent {

  categoryForm: FormGroup;
  message: any = null;

  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  handleSubmit(): void {
    if(this.categoryForm.valid) {
      this.apiService.createCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          if(response.status === 200) {
            this.message = "Category added to list";
            setTimeout(() => {
              this.message = null;
              this.router.navigate(['/admin/categories']);
            }, 3000)
          }
        },
        error: (err) => {
          console.log(err);
          this.message = err?.error?.message || 'cannot add new category';
        }
      })
    }
  }

  handleBack(): void {
    this.router.navigate(['/admin/categories']);
  }
}
