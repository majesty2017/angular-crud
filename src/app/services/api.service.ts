import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient) { }

url: string = 'http://localhost:3000/products/'

postProduct(data: any) {
  return this.http.post<any>(this.url, data)
}

getProducts() {
  return this.http.get<any>(this.url)
}
}
