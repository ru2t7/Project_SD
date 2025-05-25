import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
// @ts-ignore
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

export interface ChatMessage {
  sender: string;
  content: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private client: Client;
  public message$ = new Subject<ChatMessage>();

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: () => {},
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/messages', (msg: IMessage) => {
        this.message$.next(JSON.parse(msg.body));
      });
    };

    this.client.activate();
  }

  sendMessage(message: ChatMessage) {
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message),
    });
  }
}
