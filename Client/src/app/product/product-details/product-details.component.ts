import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { resolveDirective } from '@angular/core/src/render3/instructions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  id: string;

  ngOnInit() {
    this.route.params.subscribe(data=>{
      let id = data['id'];
      this.id = data['id'];
      this.productService.getDetails(id).subscribe(data => {
        this.product = data;
        console.log(this.product);
      })
    })
  }


  isAdmin() {
    return localStorage.getItem('isAdmin');
  }

  isOwner(){
    
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(data=>{
      this.router.navigate([ '/product/all' ]);
    })
  }

}
