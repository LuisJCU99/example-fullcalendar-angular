import { Injectable } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { EventCalendar } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class MockServiceEventService {
  public events: any[];
  constructor(private firestore: Firestore) { }

  addPlace(event: EventCalendar){

  }

}
