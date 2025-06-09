import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
  userId: number;
  // adicione outros campos retornados pela API, se houver
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;

  private token: string | null = null;
  private userId: string | null = null;


  constructor(private router: Router, private http: HttpClient) {}


  // Métodos para gerenciar autenticação
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  setUserId(id: string): void {
    this.userId = id;
    localStorage.setItem('userId', id);
  }

  getUserId(): string | null {
    return this.userId || localStorage.getItem('userId');
  }

  setUserName(name: string): void {
    localStorage.setItem('userName', name);
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.token = null;
    this.userId = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }

  // Método login que chama a API, guarda token e userId
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/session`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUserId(response.id);
        this.setUserName(response.name);
      })
    );
  }

  // Método register para cadastro de usuários
  register(data: { name: string; email: string; password: string; whatsapp: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

}