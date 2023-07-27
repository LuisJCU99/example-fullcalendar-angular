import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, getDocs, doc, getDoc, deleteDoc, updateDoc } from "@angular/fire/firestore";
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

  getEventById(id: string): Observable<EventCalendar | undefined> {
    const eventRef = doc(this.firestore, 'events', id);
    return new Observable<EventCalendar | undefined>(observer => {
      getDoc(eventRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const eventData = docSnapshot.data() as EventCalendar;
            observer.next(eventData);
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  deleteEventCalendar(eventId: string){
    const eventDocRef = doc(this.firestore, `events/${eventId}`);
    return deleteDoc(eventDocRef);

  }

  updateEventCalendar(eventId: string, newData: Partial<EventCalendar>) {
    const eventDocRef = doc(this.firestore, 'events', eventId);
    return updateDoc(eventDocRef, newData);
  }
}
