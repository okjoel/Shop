import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  cart: any[] = []; // This could be managed in a service in a real application
  userId: number = 1; // Replace this with the actual logged-in user's ID
  isHomePage: boolean = true; // Added isHomePage property

  constructor(
    private ds: DataService, 
    private snackBar: MatSnackBar,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Check if the current URL is the homepage
    this.isHomePage = this.router.url === '/';

    // Fetch products
    this.ds.getProducts().subscribe((res: any) => {
      this.products = res.payload;
    });
  }

  getImageUrl(photo: string): string {
    return `http://localhost/shop/backend/${photo}`;
  }
}
