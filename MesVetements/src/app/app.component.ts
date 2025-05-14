import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MesVetements';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loadToken();

    if (this.authService.getToken() == null || this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      this.authService.decodeJWT();         // ✅ restore roles and username
      this.authService.isloggedIn = true;   // ✅ mark user as logged in
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
