import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() totalPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pageNumbers(): (number | string)[] {
    const maxVisiblePages = 9;
    let pageNumbers: (number | string)[] = [];

    const startPage = Math.max(this.currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, this.totalPage);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < this.totalPage) {
      if (endPage < this.totalPage - 1) pageNumbers.push('...');
      pageNumbers.push(this.totalPage);
    }

    return pageNumbers;
  }

  changePage(page: number | string): void {
    if (page === '...') return;
    this.pageChange.emit(typeof page === 'number' ? page : this.currentPage);
  }
}
