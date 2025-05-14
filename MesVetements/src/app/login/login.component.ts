import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule ,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {


  user = new User();
  erreur = 0;
  err:number = 0;

  constructor(private authService: AuthService,
    private router: Router) { }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });

  }
  ngOnInit(): void { }
}
