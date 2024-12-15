import { Component } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignInAdminComponent } from '../sign-in-admin/sign-in-admin.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  role: string;

  
  constructor(private router: Router,public dialog: MatDialog, 
    private ds: DataService ) {this.role = localStorage.getItem('role') || '';}

  
  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '500px',
      height: '400px',
      
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  openSignInAdminDialog(): void {
    const dialogRef = this.dialog.open(SignInAdminComponent, {
      width: '500px',
      height: '400px',
      
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
