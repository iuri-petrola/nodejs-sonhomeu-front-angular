import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/servicos/alert.service';
import { AuthService } from 'src/app/core/servicos/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.alert.success('Login realizado com sucesso!');
        this.router.navigate(['/']); // redireciona para home ou dashboard
      },
      error: (err) => {
        console.error(err);
        this.alert.error('Email ou senha inválidos.');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}
