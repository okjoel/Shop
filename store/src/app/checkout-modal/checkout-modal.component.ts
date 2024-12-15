import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/dataservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent {
  totalAmount: number;
  vat: number;
  deliveryFee: number;
  grandTotal: number;
  date: string;
  selectedItems: any[];

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CheckoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.totalAmount = data.totalAmount;
    this.selectedItems = data.selectedItems;
    this.vat = this.totalAmount * 0.05; // 5% VAT
    this.deliveryFee = 75; // Fixed delivery fee
    this.grandTotal = this.totalAmount + this.vat + this.deliveryFee;
    this.date = new Date().toLocaleDateString(); // Today's date
  }

  onCheckout(): void {
    const userId = localStorage.getItem('user_id');
    console.log("User ID in Checkout:", userId);

    if (userId) {
      this.dataService.checkoutCart(+userId, this.selectedItems).subscribe(
        response => {
          if (response.status === 'success') {
            this.dialogRef.close({ status: 'success' });
            this.snackBar.open('Thank you for shopping with us!', 'Close', { duration: 2000 });
          } else {
            console.error('Checkout failed:', response.message);
            this.dialogRef.close({ status: 'error' });
          }
        },
        error => {
          console.error('Error during checkout:', error);
          this.dialogRef.close({ status: 'error' });
        }
      );
    } else {
      console.error('User ID is missing');
      this.dialogRef.close({ status: 'error' });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
