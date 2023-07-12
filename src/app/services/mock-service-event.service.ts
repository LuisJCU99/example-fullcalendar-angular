import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockServiceEventService {
  public events: any[];
  constructor() { }

}
