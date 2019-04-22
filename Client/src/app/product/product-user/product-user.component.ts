import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.css']
})
export class ProductUserComponent implements OnInit {
  userProduct$: Observable<Product[]>
   
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.userProduct$ = this.productService.getUserProduct();
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(data=>{
      this.userProduct$ = this.productService.getUserProduct();
    })
  }

}
