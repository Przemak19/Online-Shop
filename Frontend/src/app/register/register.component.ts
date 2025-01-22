import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private readonly apiService: ApiService, private router: Router) {}

  formData: any = {
    username: '',
    email: '',
    password: ''
  }

  message: any = null;

  async handleSubmit() {
    if(!this.formData.email || !this.formData.username || !this.formData.password) {
      this.showMessage("All fields required!");
      return;
    }

    try{
      const response: any = await firstValueFrom(this.apiService.registerUser(this.formData));
      if(response.status === 200) {
        this.showMessage("User successfully registered");
        this.router.navigate(['/login']);
      }
    }catch(error: any) {
        console.log(error);
        this.showMessage(error.error?.message || error.message || 'Something went wrong with registration...');
    }
  }

  showMessage(message: string) {
    this.message = message;

    setTimeout(() => {
      this.message = null
    },2500);
  }

}
