import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  product$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    setTimeout(() => {
      this.product$ = this.productService.getAllProduct();
    },1000)
  }

  isAdmin() {
    return localStorage.getItem('isAdmin');
  }
  
  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(data=>{
      this.product$ = this.productService.getUserProduct();
    })
  }
}
