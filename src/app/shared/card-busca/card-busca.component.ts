import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/core/servicos/alert.service';
import { AuthService } from 'src/app/core/servicos/auth.service';
import { ProdutosService } from 'src/app/core/servicos/produtos.service';
import { Produto } from 'src/app/core/types/types';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.scss']
})
export class CardBuscaComponent {
  @Input() produtos!: Produto;

  constructor(
    private produtosService: ProdutosService,
    private authService: AuthService,
    private alert: AlertService
  ) {}

  adicionarAoCarrinho(produtoId: string) {
    // Obtenha o ID do usuário e token do serviço de autenticação
    const usuarioId = this.authService.getUserId();
    const token = this.authService.getToken();

    if (!token) {
      console.error('Usuário não autenticado!');
      this.alert.warningWithRedirect('Voce precisa estar logado para adicionar ao carrinho !');
      return;
    }

    this.produtosService.adicionarAoCarrinho(produtoId)
      .subscribe({
        next: (response) => {
          console.log('Produto adicionado ao carrinho:', response);
          this.alert.successAddCarrinho('Produto adicionado ao carrinho !');
        },
        error: (err) => {
          console.error('Erro ao adicionar ao carrinho:', err.error);
          this.alert.errorAddCarrinho('Erro ao adicionar ao carrinho !');
        }
    });
  }

}
