import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AngularCrudService {

productID!: string

constructor(private firstore: Firestore) { }

setProductID(prodId: string) {
  this.productID = prodId
}

getProductID() {
  return this.productID
}

storeProduct(data: any) {
  const dbInstance = collection(this.firstore, 'products')
  return addDoc(dbInstance, data)
}

fetchProducts() {
  const dbInstance = collection(this.firstore, 'products')
  return collectionData(dbInstance, {idField: 'id'})
}

showProduct(id: string) {
  const docInstance = doc(this.firstore, 'products', id)
  return getDoc(docInstance)
}

updateProduct(id: string, data: any) {
  const docInstance = doc(this.firstore, 'products', id)
  return updateDoc(docInstance, data)
}

deleteProduct(id: string) {
  const docInstance = doc(this.firstore, 'products', id)
  return deleteDoc(docInstance)
}

toastr(status: any, title: any, timer: number = 3000) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: status,
    title: `${title} successfully!`
  })
}

}
