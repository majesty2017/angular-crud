import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { AngularCrudService } from 'src/app/services/angular-crud.service';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mWidth: string = '40%'

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private angularCrud: AngularCrudService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  updateProduct(id: string) {
    this.angularCrud.setProductID(id)
    this.angularCrud.showProduct(id)
    .then((res: any) => {
      const data = res.data()
      this.dialog.open(DialogComponent, {
        width: this.mWidth,
        data: data
      });
    })
    .catch(err => console.log(err))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

deleteProduct(id: string) {
  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.angularCrud.deleteProduct(id)
      .then(() => {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        )
      })
      .catch(err => console.log(err))
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your data file is safe :)',
        'error'
      )
    }
  })
}

  openDialog() {
     this.dialog.open(DialogComponent, {
      width: this.mWidth
     });
  }

  getAllProducts() {
    this.angularCrud.fetchProducts().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: err => console.log(err)
    })
  }
}
