import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/servicos/alert.service';
import { CarrinhoService } from 'src/app/core/servicos/carrinho.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  itens: any[] = [];
  total = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private alert: AlertService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho() {
    this.carrinhoService.listarCarrinho().subscribe({
      next: (res) => {
        this.itens = res;
        this.total = this.itens.reduce((acc, item) => {
          return acc + (item.product.price * item.quantity);
        }, 0);
      },
      error: () => this.alert.error('Erro ao carregar carrinho.')
    });
  }


  //removerItem(id: number) {
  //  this.carrinhoService.removerItem(id).subscribe({
  //    next: () => {
  //      this.alert.success('Item removido.');
  //      this.carregarCarrinho();
  //    },
  //    error: () => this.alert.error('Erro ao remover item.')
  //  });
  // }

  finalizarCompra() {
    this.carrinhoService.finalizarCompra().subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Compra finalizada!',
          html: `
            <p>Entre em contato com <strong>Lucy</strong> para concluir seu pedido.</p>
            <a href="https://wa.me/5585996270455?text=Olá%20Lucy,%20finalizei%20minha%20compra!" 
               target="_blank"
               style="color: #25D366; font-weight: bold;">
               Falar com Lucy no WhatsApp
            </a>
          `
        });
        this.router.navigate(['/']);
      },
      error: () => {
        this.alert.error('Erro ao finalizar a compra.');
      }
    });
  }

}
