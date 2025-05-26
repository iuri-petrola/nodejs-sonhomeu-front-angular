import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/servicos/alert.service';
import { AuthService } from 'src/app/core/servicos/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  whatsapp = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  onRegister() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      whatsapp: this.whatsapp
    }).subscribe({
      next: () => {
        this.alert.success('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.alert.error('Erro ao cadastrar. preencha todos os campos.');
      }
    });
  }
}
