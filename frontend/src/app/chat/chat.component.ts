import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSocketService, ChatMessage } from '../services/web-socket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';

  constructor(private ws: WebSocketService, private auth: AuthService) {}

  ngOnInit() {
    this.ws.message$.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const message: ChatMessage = {
      sender: this.auth.currentUser?.username || 'Unknown',
      content: this.newMessage,
      timestamp: ''
    };

    this.ws.sendMessage(message);
    this.newMessage = '';
  }
}
