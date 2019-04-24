import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  username:string
  constructor(
    public authService: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.username = localStorage.getItem('username')
   }

  logout() {
    this.authService.logout();
    this.router.navigate([ '/' ]);
  }
}
