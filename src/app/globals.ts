import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Globals {
  private messageSource = new BehaviorSubject<string>("list");
  currentMessage = this.messageSource.asObservable();
  
  constructor() { }
  changeMessage(message: string) {
  this.messageSource.next(message)

  }

}