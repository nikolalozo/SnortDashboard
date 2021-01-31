import { Injectable } from '@angular/core';
import { Alert } from '../app/alert'
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  socket: any;
  readonly url: string = "ws://localhost:3000";


  constructor() {
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }
}
