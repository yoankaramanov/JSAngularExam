import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, 
      private productService: ProductService,
      private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      itemName:['', [Validators.required, Validators.minLength(4)]],
      location:['', [Validators.required,Validators.minLength(4)]],
      contactNumber:['', [Validators.required, Validators.minLength(4)]],
      description:['', [Validators.required,Validators.minLength(10)]],
      price:['', [Validators.required,Validators.min(1)]],
      image:['', [Validators.required]],
    })
  }

  get f() {return this.form.controls;}

  get invalid() {return this.form.invalid;}

  createProduct() {
    this.productService.createProduct(this.form.value).subscribe((data)=>{
      this.router.navigate(['/product/all']);
    })
  }



}
