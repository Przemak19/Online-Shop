import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  authStatus = new EventEmitter<void>();

  private static URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private getHeader():HttpHeaders{ 
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }

  //authentication

  logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('searchValue');
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem('token');

    return !!token;
  }

  isAdmin():boolean {
    const role = localStorage.getItem('role');

    return role === 'ADMIN';
  }

  //authorization

  registerUser(registration: any):Observable<any>{
    return this.http.post(`${ApiService.URL}/authorization/register`, registration);
  }

  loginUser(loginData: any):Observable<any>{
    return this.http.post(`${ApiService.URL}/authorization/login`, loginData);
  }

  getLoggedUserInfo(): Observable<any>{
    return this.http.get(`${ApiService.URL}/user/info`, {
      headers: this.getHeader()
    })
  }

  //items

  addItem(formData: any): Observable<any> {
    return this.http.post(`${ApiService.URL}/item/create`, formData, {
      headers: this.getHeader()
    });
  }

  updateItem(itemId: string, formData: any): Observable<any> {
    return this.http.put(`${ApiService.URL}/item/update/${itemId}`, formData, {
      headers: this.getHeader()
    });
  }

  getAllItems(): Observable<any> {
    return this.http.get(`${ApiService.URL}/item/get-all-items`);
  }

  searchItems(keyword: string): Observable<any> {
    return this.http.get(`${ApiService.URL}/item/search`, {
      params: {keyword}
    });
  }

  getItemsByCategoryId(categoryId: string): Observable<any> {
    return this.http.get(`${ApiService.URL}/item/get-by-category/${categoryId}`);
  }

  getItemById(itemId: string): Observable<any> {
    return this.http.get(`${ApiService.URL}/item/get-item/${itemId}`);
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${ApiService.URL}/item/delete/${itemId}`, {
        headers: this.getHeader()
      })
  }

    //categories

    createCategory(body: any): Observable<any> {
      return this.http.post(`${ApiService.URL}/category/create`, body, {
        headers: this.getHeader()
      })
    }

    updateCategory(categoryId: string, body: any): Observable<any> {
      return this.http.put(`${ApiService.URL}/category/update/${categoryId}`, body, {
        headers: this.getHeader()
      })
    }

    getAllCategories(): Observable<any> {
      return this.http.get(`${ApiService.URL}/category/get-all-categories`)
    }

    getCategoryById(categoryId: string): Observable<any> {
      return this.http.get(`${ApiService.URL}/category/get-category/${categoryId}`)
    }

    deleteCategory(categoryId: string): Observable<any> {
      return this.http.delete(`${ApiService.URL}/category/delete/${categoryId}`, {
        headers: this.getHeader()
      })
    }

    //orders

    createOrder(body: any): Observable<any> {
      return this.http.post(`${ApiService.URL}/order/create`, body, {
        headers: this.getHeader()
      })
    }

    getAllOrders(): Observable<any> {
      return this.http.get(`${ApiService.URL}/order/filter`, {
        headers: this.getHeader()
      })
    }

    getOrderItemById(itemId: string): Observable<any> {
      return this.http.get(`${ApiService.URL}/order/filter`, {
        headers: this.getHeader(),
        params: {itemId}
      })
    }

    getOrderItemsByStatus(status: string): Observable<any> {
      return this.http.get(`${ApiService.URL}/order/filter`, {
        headers: this.getHeader(),
        params: {status}
      })
    }

    updateOrderItemStatus(orderItemId: number, status: string): Observable<any> {
      return this.http.put(`${ApiService.URL}/order/update-status/${orderItemId}`, null, {
        headers: this.getHeader(),
        params: {status}
      })
    }

    //address

    saveAddress(body: any):Observable<any> {
      return this.http.post(`${ApiService.URL}/address/save`,body, {
        headers: this.getHeader()
      })
    }



}
