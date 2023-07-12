import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import { EVENTS } from '../mock-events';
import { AddEventCalendarDialogComponent } from '../components/dialogs/add-event-calendar-dialog/add-event-calendar-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events: any[];
  public options: any;

  constructor(    private dialog: MatDialog,
    ) { }

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

      //Elementos del footer
      // footer: {
      //   left: '',
      //   center: '',
      //   right: ''
      // },
      
      editable: false,
      eventClick: function (info) {
        alert('Event: ' + info.event.title);
      },
    },
      this.events = EVENTS;
  }
  opendialog() {
    const dialogRef = this.dialog.open(AddEventCalendarDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
