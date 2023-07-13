import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from "@angular/fire/firestore";
import { EventCalendar } from '../interfaces/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockServiceEventService {
  constructor(private firestore: Firestore) { }

  addEventCalendar(event: EventCalendar){
    const placeRef = collection(this.firestore, 'events');
    return addDoc(placeRef, event);
  }

  getEventsCalendar(): Observable<EventCalendar[]> {
    const placeRef = collection(this.firestore, 'events');
    return collectionData(placeRef, {idField: 'id'}) as Observable<EventCalendar[]>

  }

}
