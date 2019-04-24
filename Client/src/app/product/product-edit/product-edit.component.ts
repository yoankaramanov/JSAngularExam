import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  product : Product

  constructor(private fb: FormBuilder,
    private productService: ProductService,
     private route: ActivatedRoute,
     private router: Router) { }

  get f() {return this.form.controls;}

  get invalid() {return this.form.invalid;}

 ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      itemName:[this.product.itemName, [Validators.required, Validators.minLength(4)]],
      location:[this.product.location, [Validators.required,Validators.minLength(4)]],
      contactNumber:[this.product.contactNumber, [Validators.required,Validators.minLength(4)]],
      description:[this.product.description, [Validators.required,Validators.minLength(10)]],
      price:[this.product.price, [Validators.required,Validators.min(1)]],
      image:[this.product.image, [Validators.required]],
      
    })
  }

  editProduct() {
    
    let formValue = this.form.value;
    
    this.productService.editProduct(formValue, this.id).subscribe((data)=>{
      this.router.navigate(['/product/all']);
    })
    
  }

}
