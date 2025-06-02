import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css'
})
export class AdminOrderComponent implements OnInit{

  orders: any[] = [];
  filterOrders: any[] = [];
  statusFilter: string = '';

  currentPage: number = 1;
  totalPages: number = 0;
  itemPerPage: number = 5;

  error: any = null;

  orderStatus = ['PENDING', 'APPROVED', 'SENT', 'RECEIVED', 'REJECTED', 'RETURNED'];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.fetchOrders();
  }

  fetchOrders(): void {
    const orderObservable = this.statusFilter ? this.apiService.getOrderItemsByStatus(this.statusFilter) : this.apiService.getAllOrders();

    orderObservable.subscribe({
      next: (res) => {
        this.setOrders(res.orderItemList || [])
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  setOrders(orderList: any[]): void {
    this.orders = orderList;

    this.totalPages = Math.ceil(this.orders.length / this.itemPerPage);

    this.filterOrders = this.orders.slice(
      (this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage
    )

    console.log(this.filterOrders);
  }

  handleFilterChange(): void {
    this.currentPage = 1;

    if(this.statusFilter) {
      const filtered = this.orders.filter(order => order.status == this.statusFilter);
      this.filterOrders = filtered.slice(0, this.itemPerPage);
      this.totalPages = Math.ceil(filtered.length / this.itemPerPage);
    } else {
      this.filterOrders = this.orders.slice(0, this.itemPerPage);
      this.totalPages = Math.ceil(this.orders.length / this.itemPerPage);
    }
  }

  changePage(page: number): void { 
    this.currentPage = page;
    this.filterOrders = this.orders.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage);
  }

  navToOrderDetails(id: number) {
    this.router.navigate([`/admin/order-details/${id}`]);
  }

}
