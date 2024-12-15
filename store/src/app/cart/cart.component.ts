import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/dataservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutModalComponent } from '../checkout-modal/checkout-modal.component'; // Adjust path as needed
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  checkedOutItems: any[] = []; // Array to hold checked-out items
  userId: number = 0; // This should be set to the logged-in user's ID
  selectedItems: Set<number> = new Set(); // Store selected product IDs
  totalAmount: number = 0; // Total amount for checkout

  paginatedCheckedOutItems: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private ds: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userIdStr = localStorage.getItem('user_id');
    this.userId = userIdStr ? +userIdStr : 0;

    if (this.userId) {
      this.getCartItems();
      this.getCheckedOutItems();
    } else {
      console.error('User ID is missing');
    }
  }

  getCartItems(): void {
    this.ds.getCartItems(this.userId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.cartItems = response.items;
          this.calculateTotalAmount(); // Calculate total amount after fetching cart items
        } else {
          console.error('Failed to fetch cart items:', response.message);
        }
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  getCheckedOutItems(): void {
    this.ds.getCheckedOutItems(this.userId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.checkedOutItems = response.items;
          this.updatePaginatedCheckedOutItems(); // Initialize pagination
        } else {
          console.error('Failed to fetch checked-out items:', response.message);
        }
      },
      (error: any) => {
        console.error('Error fetching checked-out items:', error);
      }
    );
  }

  getImageUrl(photo: string): string {
    return `http://localhost/shop/backend/${photo}`;
  }

  toggleSelection(productId: number): void {
    if (this.selectedItems.has(productId)) {
      this.selectedItems.delete(productId);
    } else {
      this.selectedItems.add(productId);
    }
    this.calculateTotalAmount(); // Recalculate total amount when selection changes
  }

  deleteCartItem(id: number): void {
    this.ds.deleteFromCart([id]).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          console.log('Item removed from cart');
          this.cartItems = this.cartItems.filter(item => item.id !== id);
          this.selectedItems.delete(id); // Ensure removed item is deselected
          this.calculateTotalAmount(); // Recalculate total amount after item removal
          window.location.reload();
        } else {
          console.error('Failed to remove item from cart:', response.message);
        }
      },
      (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }
  
  deleteSelectedItems(): void {
    const selectedItemIds = Array.from(this.selectedItems);
    if (selectedItemIds.length > 0) {
      this.ds.deleteFromCart(selectedItemIds).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            console.log('Selected items removed from cart');
            this.cartItems = this.cartItems.filter(item => !this.selectedItems.has(item.id));
            this.selectedItems.clear(); // Clear selected items
            this.calculateTotalAmount(); // Recalculate total amount after item removal
            window.location.reload();

          } else {
            console.error('Failed to remove selected items from cart:', response.message);
          }
        },
        (error: any) => {
          console.error('Error removing selected items from cart:', error);
        }
      );
    } else {
      this.snackBar.open('No items selected for deletion', 'Close', { duration: 2000 });
    }
  }
  proceedToCheckout(): void {
    if (this.selectedItems.size > 0) {
      // Filter selected items from cartItems
      const selectedItemsArray = this.cartItems.filter(item => this.selectedItems.has(item.id));
      const totalAmount = selectedItemsArray.reduce((total, item) => total + (item.price * item.quantity), 0);
  
      // Open the modal with the selected items and total amount
      this.dialog.open(CheckoutModalComponent, {
        data: {
          selectedItems: selectedItemsArray,
          totalAmount: totalAmount
        }
      }).afterClosed().subscribe(result => {
        if (result && result.status === 'success') {
          this.snackBar.open('Thank you for shopping with us!', 'Close', { duration: 2000 });
  
          // After successful checkout, refresh the cart items
          this.getCartItems(); // Refresh cart items
          this.getCheckedOutItems(); // Refresh checked-out items
        }
      });
    } else {
      this.snackBar.open('No items selected for checkout', 'Close', { duration: 2000 });
    }
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems
      .filter(item => this.selectedItems.has(item.id)) // Include only selected items
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    console.log(`Updating item ${itemId} to quantity ${newQuantity}`);
    this.ds.updateCartItem(itemId, newQuantity).subscribe(response => {
      console.log('API Response:', response);
      if (response.status === 'success') {
        this.getCartItems(); // Reload items to reflect changes
      } else {
        
      }
    });
  }

  checkAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => (checkbox as HTMLInputElement).checked = true);
    this.cartItems.forEach(item => this.selectedItems.add(item.id)); // Update selectedItems
    this.calculateTotalAmount(); // Recalculate total amount
  }

  uncheckAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => (checkbox as HTMLInputElement).checked = false);
    this.selectedItems.clear(); // Clear selectedItems
    this.calculateTotalAmount(); // Recalculate total amount
  }

  updatePaginatedCheckedOutItems() {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedCheckedOutItems = this.checkedOutItems.slice(startIndex, endIndex);
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedCheckedOutItems = this.checkedOutItems.slice(startIndex, endIndex);
  }

  handleDeleteAction(): void {
    if (this.selectedItems.size > 0) {
      this.deleteSelectedItems();
    } else if (this.cartItems.length > 0) {
      // If no items are selected but cartItems exists, delete the first item as default action
      this.deleteCartItem(this.cartItems[0].id);
    }
  }

  // Additional methods to conditionally show/hide buttons
  shouldShowDeleteButton(): boolean {
    return this.cartItems.length > 0; // Show if there are items in the cart
  }
}
