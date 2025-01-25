import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private readonly apiService: ApiService, private router: Router){}

  menuOpen: boolean = false;

  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  searchValue: string = '';
  private authStatusSub: Subscription | null = null;

  ngOnInit(): void {
      this.isAuthenticated = this.apiService.isAuthenticated();
      this.isAdmin = this.apiService.isAdmin();

      this.authStatusSub = this.apiService.authStatus.subscribe(() => {
        this.isAuthenticated = this.apiService.isAuthenticated();
        this.isAdmin = this.apiService.isAdmin();
      })
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
}

  handleSearchSubmit() {
    this.router.navigate(['/home'], {queryParams: {search: this.searchValue}});
  }

  handleLogout() {
    const confrim = window.confirm("Do you want to log out?");

    if(confrim) {
      this.apiService.logout();
      this.router.navigate(['login']);
      this.apiService.authStatus.emit();
    }
  }

  ngOnDestroy(): void {
      if(this.authStatusSub) {
        this.authStatusSub.unsubscribe();
      }
  }
}
