import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  warning(msg: string, title: string = 'Atenção') {
    Swal.fire({
      icon: 'warning',
      title,
      text: msg,
      confirmButtonText: 'OK',
    });
  }

  success(msg: string, title: string = 'Sucesso') {
    Swal.fire({
      icon: 'success',
      title,
      text: msg,
      confirmButtonText: 'Beleza',
    });
  }

  error(msg: string, title: string = 'Erro') {
    Swal.fire({
      icon: 'error',
      title,
      text: msg,
    });
  }

  warningWithRedirect(msg: string, title = 'Atenção', redirectTo: string = '/login') {
    return Swal.fire({
      icon: 'warning',
      title,
      text: msg,
      showCancelButton: true,
      confirmButtonText: 'Ir para pagina de Login',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = redirectTo; // redireciona ao clicar no botão
      }
    });
  }

  errorAddCarrinho(msg: string, title: string = 'Erro') {
    Swal.fire({
      icon: 'error',
      title,
      text: msg,
    });
  }

  successAddCarrinho(msg: string, title: string = 'Sucesso') {
    Swal.fire({
      icon: 'success',
      title,
      text: msg,
      confirmButtonText: 'Beleza',
    });
  }

}