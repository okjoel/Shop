import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { DataService } from '../services/dataservice.service';
import { SignInAdminComponent } from '../sign-in-admin/sign-in-admin.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  cartItemsCount: number = 0;
  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private ds: DataService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const userId = localStorage.getItem('user_id');
    const adminId = localStorage.getItem('admin_id');
    const role = localStorage.getItem('role');
    
    this.isLoggedIn = !!userId || !!adminId;
    this.isAdminLoggedIn = role === 'admin';
    
    if (this.isLoggedIn && userId) {
      this.ds.getCartItems(+userId).subscribe(
        response => {
          if (response.status === 'success') {
            this.cartItemsCount = response.items.length;
          } else {
            console.error('Failed to fetch cart items:', response.message);
          }
        },
        error => {
          console.error('Error fetching cart items:', error);
        }
      );
    }
  }

  toggleCart() {
    this.router.navigate(['/cart']);
  }

  upload() {
    this.router.navigate(['/upload']);
  }

  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '500px',
      height: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checkLoginStatus(); // Refresh login status after closing dialog
    });
  }

  openSignInAdminDialog(): void {
    const dialogRef = this.dialog.open(SignInAdminComponent, {
      width: '500px',
      height: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checkLoginStatus(); // Refresh login status after closing dialog
    });
  }

  logout(): void {
    this.ds.logout(); // Call logout function in dataservice
    localStorage.removeItem('user_id'); // Clear user ID from local storage
    localStorage.removeItem('role'); // Clear role from local storage
    this.checkLoginStatus(); // Refresh login status
    this.router.navigate(['/login']); // Navigate to login page
  }

  logoutAsAdmin(): void {
    this.ds.logout(); // Call logout function in dataservice
    localStorage.removeItem('admin_id'); // Clear user ID from local storage
    localStorage.removeItem('role'); // Clear role from local storage
    this.checkLoginStatus(); // Refresh login status
    this.router.navigate(['/login']); // Navigate to login page
  }
}
