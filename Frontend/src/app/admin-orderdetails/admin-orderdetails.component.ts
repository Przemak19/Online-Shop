import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orderdetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orderdetails.component.html',
  styleUrl: './admin-orderdetails.component.css'
})
export class AdminOrderdetailsComponent implements OnInit{

  orderItem: any[] = [];
  selectedStatus: {[key: number]: string} = {};
  orderItemId: any = '';

  message: any = null;

  orderStatus = ['PENDING', 'APPROVED', 'SENT', 'RECEIVED', 'REJECTED', 'RETURNED'];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.orderItemId = this.route.snapshot.paramMap.get('orderItemId');
      this.fetchOrderDetails();
  }

  fetchOrderDetails(): void {
    this.apiService.getOrderItemById(this.orderItemId).subscribe({
      next: (res) => {
        this.orderItem = res.orderItemList || [];
        this.orderItem.forEach(item => {
          this.selectedStatus[item.id] = item.status;
        });
      },
      error: (err) => {
        this.message = err?.error?.message;
      }
    })
  }

  handleStatusChange(orderId: number, newStatus: string): void {
    this.selectedStatus[orderId] = newStatus;
  }

  handleSubmit(orderId: number): void {
    
    this.apiService.updateOrderItemStatus(orderId, this.selectedStatus[orderId]).subscribe({
      next: (res) => {
        this.fetchOrderDetails();
        this.message = 'Order sucessully updated';
        setTimeout(() => {
          this.message = null;
          this.router.navigate([`/admin/orders`]);
        }, 3000);
      }
    })
  }

}
