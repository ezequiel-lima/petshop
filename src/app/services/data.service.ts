import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = 'http://localhost:3000/v1/';

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = sessionStorage.getItem('petshop.token');
    //const headers = new HttpHeaders().set('x-access-token', token);
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  authenticate(data: any) {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(`${this.url}/accounts/refresh-token`,
      null,
      { headers: this.composeHeaders() }
    );
  }
}
