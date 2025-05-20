import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  listarCarrinho(): Observable<any[]> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${this.apiUrl}/cart`, { headers });
  }

  //removerItem(itemId: number): Observable<any> {
  //  return this.http.delete(`${this.apiUrl}/cart/${itemId}`);
  //}

  finalizarCompra(): Observable<any> {
    const token = this.authService.getToken();
    const userId = this.authService.getUserId();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch(`${this.apiUrl}/cart/close`,{ userId: userId }, {headers});
  }

}
