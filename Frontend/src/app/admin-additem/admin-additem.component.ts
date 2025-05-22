import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-admin-additem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-additem.component.html',
  styleUrl: './admin-additem.component.css'
})
export class AdminAdditemComponent implements OnInit{

    image: any = null;
    categories: any[] = [];
    categoryId: number | null = null;
    name: string = '';
    description: string = '';
    price: string = '';
    message: string = '';


  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
      this.apiService.getAllCategories().subscribe({
        next:(response) => {
          this.categories = response.categoryList || []
        },
        error:(err) => {
          console.log(err);
        }
      })
  }

  handleImgae(event: Event): void {
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length > 0) {
      this.image = input.files[0];
    }
  }

  handleSubmit(): void {
    if(!this.image || !this.categoryId || !this.name || !this.description || !this.price) {
      this.message = 'Fill all fields to submit';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('categoryId', this.categoryId.toString());
    formData.append('price', this.price);

    this.apiService.addItem(formData).subscribe({
      next: (response) => {
        this.message = response.message;
        setTimeout(() => {
          this.router.navigate(['/admin/items'])
        }, 3000)
      },
      error: (err) => {
        this.message = err?.error?.message || "Cannot add new item";
      }
    })
  }

  handleBack(): void {
    this.router.navigate(['/admin/categories']);
  }

  validatePriceInput(event: KeyboardEvent) {
  const inputChar = event.key;
  const currentValue = (event.target as HTMLInputElement).value;
  
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
       'Backspace', 'Delete', 'Tab'].includes(inputChar)) {
    return true;
  }

  if (inputChar === '.' || inputChar === ',') {
    if (currentValue.includes('.') || currentValue.includes(',')) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  event.preventDefault();
  return false;
}

}
