import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/product.service";

@Injectable()
export class DetailsResolver implements Resolve<Product>{

    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot) {
        const id = route.params['id'];
        return this.productService.getDetails(id);
    }

}