import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, getDocs } from "@angular/fire/firestore";
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

  getEventByField(fieldName: string, value: string): Observable<EventCalendar | undefined> {
    const placeRef = collection(this.firestore, 'events');
    const q = query(placeRef, where('start', '==', value));

    return new Observable<EventCalendar | undefined>((observer) => {
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.empty) {
          observer.next(undefined); // No se encontraron coincidencias
        } else {
          const event = querySnapshot.docs[0].data() as EventCalendar;
          observer.next(event); // Se encontró el elemento que coincide con el campo y valor
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }


}
