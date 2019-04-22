import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
  
    constructor(
      private router : Router,
      private toastr: ToastrService
    ) { }
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      if (localStorage.getItem('isAdmin') === 'true') {
        return true;
      }  
      this.toastr.error('Access denied :P','Authorization error')
      this.router.navigate(['/home']);
      return false;
    }
  }