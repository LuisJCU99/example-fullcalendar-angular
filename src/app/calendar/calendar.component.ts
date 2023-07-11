import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import {MatCardModule} from '@angular/material/card';
import listPlugin from '@fullcalendar/list';


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
    console.log(new Date());

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin,interactionPlugin, listPlugin],
      defaulDate: new Date(),
      locale: esLocale,
      navLinks: true,
      
      navLinkDayClick: function(date) {
        console.log('day', date);
        alert(date);
      },

      header:{
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,listWeek'
      },
      editable: false
    }

    this.events = [
      {
        title: "Evento 1",
        start: new Date(),
        description: "Esta es la descripción"
      },
      {
        title: "Evento 2",
        start: new Date(new Date().getTime() + 86400000 ),
        description: "Evento 3"
      },
      {
        title: "Evento 3",
        start: new Date(new Date().getTime() + (86400000 * 2) ),
        end: new Date(new Date().getTime() + (86400000 * 4) ),
        description: "Evento 3"
      },
    ]
  }

}
