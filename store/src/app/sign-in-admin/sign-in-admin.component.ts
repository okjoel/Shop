import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/dataservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.css']
})
export class SignInAdminComponent {
  admin_name: string = '';
  admin_email: string = '';
  admin_password: string = '';

  constructor(
    public dialogRef: MatDialogRef<SignInAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ds: DataService,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  registeradmin() {
    const requestData = {
      admin_name: this.admin_name,
      admin_email: this.admin_email,
      admin_password: this.admin_password
    };

    this.ds.sendApiRequest('registeradmin', requestData).subscribe(
      (response: any) => {
        console.log(response);
        this.admin_name = '';
        this.admin_email = '';
        this.admin_password = '';
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  async loginadmin() {
    const userInfo = {
      admin_email: this.admin_email,
      admin_password: this.admin_password
    };
  
    await this.ds.sendApiRequest("loginadmin", userInfo).subscribe((res: any) => {
      if (res.payload == null) {
        this.snackbar.open("Incorrect Credentials", 'close', { duration: 1200 });
      } else {
        localStorage.setItem("admin_email", res.payload.admin_email);
        localStorage.setItem("admin_id", res.payload.admin_id);
        localStorage.setItem("admin_name", res.payload.admin_name);
        localStorage.setItem("role", 'admin');
  
        this.snackbar.open("Welcome, " + localStorage.getItem("admin_name") + "!", 'close', { duration: 3000 });
  
        // Close the dialog
        this.dialogRef.close();
  
        // Optional: Refresh the page if needed
        // location.reload();
      }
    });
  }
  
}
