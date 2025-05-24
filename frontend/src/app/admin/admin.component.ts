import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  tasks: Task[] = [];
  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  newTask: Task = {
    title: '',
    description: '',
    deadline: ''
  };

  createTask() {
    this.taskService.createTask(this.newTask).subscribe(created => {
      this.tasks.push(created);
      this.newTask = { title: '', description: '', deadline: '' };
    });
  }
  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(id: number | undefined) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }



}


type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'DONE';

interface Task {
  id?: number;
  title: string;
  description: string;
  deadline: string;
  status?: TaskStatus;
}

