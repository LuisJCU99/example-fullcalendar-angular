import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { MatCardModule } from '@angular/material/card';
import listPlugin from '@fullcalendar/list';
import { EVENTS } from '../mock-events';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  
  public events: any[];
  public options: any;

  constructor() { }

  ngOnInit() {

    // Propiedad hijo en la que se configura la funcionalidad del calendario
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      defaulDate: new Date(),
      locale: esLocale,

      //Se permiten acciones en cada uno de los días 
      navLinks: true,
      navLinkDayClick: function (date) {
        console.log('day', date);
        alert(date);
      },

      //Elementos del header
      header: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,listWeek'
      },
      editable: false,
      eventClick: function(info) {
        alert('Event: ' + info.event.title);
      }
    },
    this.events = EVENTS;
  }

}
