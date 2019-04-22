import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username : string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }
}
