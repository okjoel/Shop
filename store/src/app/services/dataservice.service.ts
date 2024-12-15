import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  apiUrl = 'http://localhost/shop/backend/'; // Base URL for your PHP scripts

  constructor(private http: HttpClient) {}



  // General API request method
   sendApiRequest(method:any, data:any) {
    return <any>(this.http.post(this.apiUrl + method, btoa(JSON.stringify(data))));
  }
  

  // Receive API request
  receiveApiRequest(method: any): Observable<any> {
    return this.http.get(this.apiUrl + method);
  }

  // Logout user
  logout(): void {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("role");
  }

  // Fetch products
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}pullProducts`);
  }

  // Add a new product with file upload
  addProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}addProduct`, formData);
  }

  // Fetch image URL
  getImage(imagePath: string): Observable<Blob> {
    const url = `${this.apiUrl}models/getImage.php?filename=${encodeURIComponent(imagePath)}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // Add item to cart
  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}addToCart`, {
      userId,
      productId,
      quantity
    });
  }
  updateCartItem(id: number, newQuantity: number): Observable<any> {
    const body = { id, newQuantity };
    return this.http.post(`${this.apiUrl}updateCartItem`, body);
  }

  // Get items in the cart
  getCartItems(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}getCartItems`, { userId });
  }

  getCheckedOutItems(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}getCheckedOutItems` , {userId} );
  }

  // Remove item from cart
  deleteFromCart(ids: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}deleteFromCart`, { id: ids, action: 'deleteFromCart' });
  }



deleteProduct(productId: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}deleteProduct`, {
    productid: productId
  }, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
getProductById(productId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}getProductById&id=${productId}`);
}


checkoutCart(userId: number, selectedItems: any[]): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}checkoutCart`, { userId, items: selectedItems }, {
    headers: { 'Content-Type': 'application/json' }
  });
}









}
