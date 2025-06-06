import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`/api/users/${user.id}`, user);
  }

  verifyPassword(id: number, password: string): Observable<boolean> {
    return this.http.post<boolean>(`/api/users/${id}/verify-password`, password, {
      headers: { 'Content-Type': 'application/json' }
    });
  }



}
