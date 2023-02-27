import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AngularCrudService } from 'src/app/services/angular-crud.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  categories: string[] = ['Fruits', 'Vegetables', 'Eclectronics']
  freshnessList: string[] = ['Brand New', 'Used', 'Refurbished'];

  formState: string = 'Add New'
  btnText: string = 'Save'

  prodId!: string

  productForm !: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
     private angularCrud: AngularCrudService,
     private dialog: MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData: any
    ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    })

    this.prodId = this.angularCrud.getProductID()

    if (this.editData) {
      this.editData['id'] = this.prodId

      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['date'].setValue(this.editData.date.toDate())
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.formState = 'Update'
      this.btnText = 'Save Changes'
    }

  }

  onSubmit() {
    if (!this.editData) {
      if (this.productForm.valid) {
      this.angularCrud.storeProduct(this.productForm.value)
      .then(() => {
        this.productForm.reset()
        this.dialog.close('save')
      })
      .catch(err => this.angularCrud.toastr('error', 'Something went wrong!'))

      this.apiService.postProduct(this.productForm.value).subscribe({
        next: res => {
          this.productForm.reset()
          this.dialog.close('save')
          this.angularCrud.toastr('success', 'Product saved')
        },
        error: err => this.angularCrud.toastr('error', 'Something went wrong!')
      })
    }
    } else {
      if (this.productForm.valid) {
        this.angularCrud.updateProduct(this.prodId, this.productForm.value)
        .then(() => {
          this.productForm.reset()
          this.dialog.close('update')
          this.angularCrud.toastr('success', 'Changes saved')
        })
        .catch(err => this.angularCrud.toastr('error', 'Something went wrong!'))
      }
    }
  }

}
