import { Component, OnInit } from '@angular/core';
import { HelloService } from '../services/hello.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  imports: [CommonModule],
  templateUrl: './hello.component.html',
  standalone: true,
  styleUrl: './hello.component.css'
})
export class HelloComponent implements OnInit {
  greeting = 'Loading...';

  constructor(private helloService: HelloService) {}

  ngOnInit(): void {
    this.helloService.getHello()
      .subscribe({
        next: (text) => this.greeting = text,
        error: (err) => this.greeting = 'Error loading greeting'
      });
  }
}
