import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/dataservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'price', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15];
  selectedFile: File | null = null;
  name: string = '';
  price: number = 0;
  description: string = '';
  error: any;

  constructor(private ds: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pullProducts();
  }

  pullProducts() {
    this.ds.getProducts().subscribe((res: any) => {
      this.dataSource.data = res.payload;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator; // Set paginator after data is loaded
      });
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile && this.name && this.price && this.description) {
        const formData = new FormData();
        formData.append('photo', this.selectedFile);
        formData.append('name', this.name);
        formData.append('price', this.price.toString());
        formData.append('description', this.description);

        this.ds.addProduct(formData).subscribe(
            response => {
                console.log('Upload success', response);
                this.pullProducts(); // Refresh the product list after a successful upload
            },
            error => {
                console.error('Upload error', error);
                // Additional error handling for better debugging
                console.error('Error details:', error.error);
            }
        );
    } else {
        console.error('All fields are required');
    }
  }

  openDeleteDialog(product: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { name: product.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(product.productid);
      }
    });
}


// upload.component.ts

deleteProduct(productId: number): void {
  this.ds.deleteProduct(productId).subscribe(
    response => {
      if (response.status === 'success') {
        console.log('Delete success', response);
        this.pullProducts(); // Refresh the product list after a successful delete
      } else {
        console.error('Delete error: ', response.message);
      }
    },
    error => {
      console.error('Delete error', error);
    }
  );
}


}
