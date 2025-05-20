import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../types/types';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient:HttpClient,
    private authService: AuthService
  ) { }

  // Função para adicionar ao carrinho
  adicionarAoCarrinho(produtoId: string): Observable<any> {
    const userId = this.authService.getUserId();
    const token = this.authService.getToken();
    
    if (!token || !userId) {
      throw new Error('Usuário não autenticado');
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


    return this.httpClient.post(`${this.apiUrl}/cart`, {
      productId: produtoId,
      userId: userId
    }, { headers });
  }

  listar() : Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.apiUrl}/product`).pipe(
      map(produtos => produtos.map(produto => ({
        ...produto,
        // Monta a URL completa da imagem
        banner: produto.banner 
          ? `${environment.apiUrl}/${environment.imgUrl}/${produto.banner}`
          : '' // Opcional: fallback
      })))
    );
        
  }
}
