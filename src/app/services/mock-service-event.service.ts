import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from "@angular/fire/firestore";
import { EventCalendar } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class MockServiceEventService {
  public events: any[];
  constructor(private firestore: Firestore) { }

  addEventCalendar(event: EventCalendar){
    const placeRef = collection(this.firestore, 'events');
    return addDoc(placeRef, event);
  }

}
