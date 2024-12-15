import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/dataservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null = null;
  userId: number = 0; // Replace this with the actual logged-in user's ID
  quantity: number = 1; 
  product: any = {
    name: '',
    price: '',
    description: '',
    photo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private ds: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('productid')!; // Get product ID from route
      this.getProductDetails();
      const userIdStr = localStorage.getItem('user_id');
      this.userId = userIdStr ? +userIdStr : 0;
      console.log('Parsed userId in ProductDetailsComponent:', this.userId); // Debug statement
    });
  }

  getProductDetails(): void {
    if (this.productId !== null) {
      this.ds.getProductById(this.productId).subscribe(
        (response: any) => {
          console.log('API Response:', response);
          if (response.status.remarks === 'success') {
            this.product = response.payload;
            console.log('Product Data:', this.product);
          } else {
            console.error('Failed to fetch product details:', response.status.message);
          }
        },
        (error: any) => {
          console.error('Error fetching product details:', error);
        }
      );
    } else {
      console.error('Product ID is null');
    }
  }

  getImageUrl(photo: string): string {
    return `http://localhost/shop/backend/${photo}`;
  }

  addToCart() {
    if (this.userId && this.productId && this.quantity) {
      console.log("Adding to cart with:", { userId: this.userId, productId: this.productId, quantity: this.quantity }); // Debug statement
      this.ds.addToCart(this.userId, this.productId, this.quantity).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            console.log('Item added to cart');
            this.snackBar.open('Item added to cart', 'Close', {
              duration: 3000, // Duration of the snackbar
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success'] // Optional: Use a custom class for styling
            });
          } else {
            console.error('Failed to add item to cart:', response.message);
            this.snackBar.open('Failed to add item to cart', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-error']
            });
          }
        },
        (error: any) => {
          console.error('Error adding item to cart:', error);
          this.snackBar.open('Error adding item to cart', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-error']
          });
        }
      );
    } else {
      console.error('User ID, Product ID, or Quantity is missing');
    }
  }
}
