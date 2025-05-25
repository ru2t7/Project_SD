import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {Task, TaskService } from '../services/task.service';
import {FormsModule} from '@angular/forms';
import {User, UserService} from '../services/user.service';
import {ActivityService, UserActivity} from '../services/activity.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  tasks: Task[] = [];
  users: User[] = [];
  activities: UserActivity[] = [];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private userService: UserService,
    private activityService: ActivityService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.map(task => ({
        ...task,
        user_id: (task as any).user?.id || 0 // extract user.id into userId
      }));
    });

    this.activityService.getActivities().subscribe(data => this.activities = data);
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }


  newTask: Task = {
    user_id: 0,
    title: '',
    description: '',
    deadline: '',

  };

  createTask() {
    this.taskService.createTask(this.newTask).subscribe(created => {
      this.tasks.push(created);
      // @ts-ignore
      this.newTask = { user_id: 0, title: '', description: '', deadline: '' };
      this.newTask = { ...this.newTask };
    });
  }
  updateTask(task: Task) {
    const payload: any = {
      ...task,
      user: task.user_id !== 0 ? { id: task.user_id } : null
    };
    console.log('Sending payload:', payload); // Add this
    this.taskService.updateTask(payload).subscribe();
  }

  deleteTask(id: number | undefined) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

  onUserAssign(task: Task) {
    const payload: any = {
      ...task,
      user: task.user_id !== 0 ? { id: task.user_id } : null
    };
    console.log('Sending payload:', payload);
    this.taskService.updateTask(payload).subscribe();
  }

}



