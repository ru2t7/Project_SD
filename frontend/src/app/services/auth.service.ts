import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  // you could add a token field here later
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentUser') || 'null'): null
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
      user ? JSON.parse(user) : null
    );
  }

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, req).pipe(
      tap(user => {this.currentUserSubject.next(user);
                                localStorage.setItem('currentUser', JSON.stringify(user));}
      ));
  }
  get currentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
