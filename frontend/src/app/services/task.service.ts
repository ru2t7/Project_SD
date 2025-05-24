import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './user.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`/api/tasks/${id}`);
  }



}


type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id?: number;
  title: string;
  description: string;
  deadline: string;
  status?: TaskStatus;
  user_id: number;
}
