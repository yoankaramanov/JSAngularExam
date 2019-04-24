import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAllComponent } from './product-all/product-all.component';
import { CreateProductComponent } from './product-create/create-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductUserComponent } from './product-user/product-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { RouterModule } from '@angular/router';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { DetailsResolver } from './resolvers/details-resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch:'full', redirectTo: 'home' },
      { path: 'create', component: CreateProductComponent },
      { path: 'all', component: ProductAllComponent },
      { path: 'details/:id', component: ProductDetailsComponent },
      { path: 'edit/:id', component: ProductEditComponent, canActivate:[AdminGuard], resolve: {product: DetailsResolver} },
      { path: 'user', component: ProductUserComponent },
    ])
  ],
  declarations: [
    ProductAllComponent,
    CreateProductComponent,
    ProductDetailsComponent,
    ProductUserComponent,
    ProductEditComponent,
  ],
  providers:[
    ProductService,
    DetailsResolver
  ]
})
export class ProductModule { }
