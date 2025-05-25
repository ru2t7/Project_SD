import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatLogService {
  constructor(private http: HttpClient) {}
  getLogs(): Observable<ChatLog[]> {
    return this.http.get<ChatLog[]>('/api/chatlogs');
  }
}
export interface ChatLog {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

