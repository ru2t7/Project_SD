import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloService {
  private apiUrl = '/api/hello';

  constructor(private http: HttpClient) { }

  /**
   * Calls the Spring Boot endpoint and returns the greeting as text
   */
  getHello(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
