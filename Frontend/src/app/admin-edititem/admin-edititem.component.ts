import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-admin-edititem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edititem.component.html',
  styleUrl: './admin-edititem.component.css'
})
export class AdminEdititemComponent implements OnInit{

  editItemForm!: FormGroup
  categories: any[] = [];
  message: any = null;
  imageUrl: any = null;
  itemId: string = '';

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
      this.itemId = this.route.snapshot.paramMap.get('itemId') || '';
      this.editItemForm = this.fb.group({
        image: [null],
        categoryId: [''],
        name: [''],
        description: [''],
        price: ['']
      });

      this.apiService.getAllCategories().subscribe({
        next:(res) => {
          this.categories = res.categoryList || '';
        },
        error:(err) => {
          console.log("Cannot load categories");
        }
      })

      if(this.itemId) {
        this.apiService.getItemById(this.itemId).subscribe({
          next: (res) => {
            this.editItemForm.patchValue({
              categoryId: res.item.categoryId,
              name: res.item.name,
              description: res.item.description,
              price: res.item.price
            });
            this.imageUrl = res.item.imageUrl;
          }
        })
      }
  }

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if(input.files && input.files[0]) {
      const file = input.files[0];
      this.editItemForm.patchValue({
        image: file
      });

      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string
      }
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(): void {
    const formData = new FormData();
    const formValues = this.editItemForm.value;

    if(formValues.image) {
      formData.append('image', formValues.image);
    }
    formData.append('categoryId', formValues.categoryId);
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('price', formValues.price);

    this.apiService.updateItem(this.itemId, formData).subscribe({
      next: (res) => {
        this.message = res.message;
        setTimeout(() => {
          this.message = '';
          this.router.navigate(['/admin/items'])
        }, 3000);
      }, error: (err) => {
        this.message = err?.error?.message || "Unable to update a product";
      }
    })
  }

}
