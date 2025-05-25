import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserActivity {
  id: number;
  user: { id: number; username: string };
  action: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  constructor(private http: HttpClient) {}
  getActivities(): Observable<UserActivity[]> {
    return this.http.get<UserActivity[]>('/api/activities');
  }
}
