import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

const createF = 'http://localhost:5000/product/create';
const getAllF = 'http://localhost:5000/product/all';
const getDetailsF = 'http://localhost:5000/product/details/';
const getUserF = 'http://localhost:5000/product/user/';
const deleteF = 'http://localhost:5000/product/delete/';
const editF = 'http://localhost:5000/product/edit/';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  createProduct(data) {
    return this.http.post<Product>(createF,data);
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(getAllF);
  }

  getDetails(id): Observable<Product> {
    return this.http.get<Product>(`${getDetailsF}${id}`);
  }

  getUserProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(getUserF);
  }

  deleteProduct(id) {
    return this.http.delete(deleteF+id);
  }

  editProduct(data, id) {
    return this.http.put<Product>(editF+id,data);
  }
}
