import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/dataservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor( public dialogRef: MatDialogRef<SignInComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private ds: 
     DataService,private http: HttpClient, private router: Router, 
     private snackbar: MatSnackBar ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSignIn(): void {
    // Implement sign-in functionality
    alert('Signing in...');
    this.dialogRef.close();
  }
  username: string = '';
  email: string = '';
  password: string = '';
  showRegisterForm: boolean = false;
  showLoginForm: boolean = true;

  register() {
    // Prepare data to send to the API
    const requestData = {
      username: this.username,
      email: this.email,
      password: this.password


    };

    // Call the register method from the DataserviceService
    this.ds.sendApiRequest('register', requestData).subscribe(
      (response: any) => {
        console.log(response); // Handle success response here
        // Optionally, you can reset the form fields after successful addition
        this.username = '';
        this.email = '';
        this.password = '';
      },
      (error: any) => {
        console.error(error); // Handle error response here
        // Optionally, display an error message to the user
      }
    );
  }

  hidePassword: boolean = true;
  loginPrompt: string = '';

  ngOnInit(): void {
  }

  async login() {
    const userInfo = {
      email: this.email,
      password: this.password
    };
  
    await this.ds.sendApiRequest("login", userInfo).subscribe((res: any) => {
      if (res.payload == null) {
        this.snackbar.open("Incorrect Credentials", 'close', { duration: 1200 });
      } else {
        localStorage.setItem("email", res.payload.email);
        localStorage.setItem("user_id", res.payload.user_id.toString());
        localStorage.setItem("username", res.payload.username); // Store user's name
  
        console.log("Username set in localStorage:", localStorage.getItem("username")); // Debug statement
        console.log("User_id set in localStorage:", localStorage.getItem("user_id")); // Debug statement
        console.log("Email set in localStorage:", localStorage.getItem("email")); // Debug statement
        this.snackbar.open("Welcome, " + localStorage.getItem("username") + "!", 'close', { duration: 3000 });
  
        // Close the modal after successful login
        this.dialogRef.close(); // Close the modal
        this.router.navigate(["/home"]);
      }
    });
  }
  


  toggleForm() {
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginForm = !this.showLoginForm;
  }







  
}
