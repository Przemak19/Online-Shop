import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit{

  addressForm: FormGroup
  error: any = null
  isInEdit: boolean 

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) {
    this.isInEdit = this.router.url.includes('edit-address')
    this.addressForm = this.fb.group({})
  }

  ngOnInit(): void {
      this.addressForm = this.fb.group({
        country: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{3}$')]],
        city: ['', Validators.required],
        street: ['', Validators.required]
      })

      if(this.isInEdit) {
        this.fetchUserAddressInfo();
      }
  }

  fetchUserAddressInfo(): void {
    this.apiService.getLoggedUserInfo().subscribe({
      next: (response) => {
        if(response.user.address) {
          this.addressForm.patchValue(response.user.address)
        }
      },
      error: (err) => {
        this.showError(err?.error?.message || 'Unable to load address')
      }
    })
  }

  showError(message: any): void {
    this.error = message

    setTimeout(() => {
      this.error = null
    }, 3000)
  }

  handleSubmit(): void {
    if(this.addressForm.invalid) {
      this.showError('Fill all fields')
    }

    this.apiService.saveAddress(this.addressForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/account'])
      },
      error: (err) => {
        this.showError(err?.error?.message || 'Unable to save address')
      }
    })
  }
  
}
