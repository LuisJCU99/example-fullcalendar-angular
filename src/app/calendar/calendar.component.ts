import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import { EVENTS } from '../mock-events';
import { AddEventCalendarDialogComponent } from '../components/dialogs/add-event-calendar-dialog/add-event-calendar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MockServiceEventService } from '../services/mock-service-event.service';
import { EventCalendar } from '../interfaces/event';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events: any[];
  public options: any;
  public eventsCalendar: EventCalendar[];

  constructor(private dialog: MatDialog,
    private eventsCalendarService: MockServiceEventService
  ) { }

  ngOnInit() {
    this.eventsCalendarService.getEventsCalendar().subscribe(args => {
      this.eventsCalendar = args;
      //this.perfectEvents();
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
          right: ''
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
        this.events = this.perfectEvents();
    }
    );

  }
  opendialog() {
    const dialogRef = this.dialog.open(AddEventCalendarDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  typescriptStringToDate(dateString: String | Date): Date {
    var today = new Date();
    if (typeof (dateString) == 'string') {
      const [datePart, timePart] = dateString.split(", ");
      const [day, month, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");
      const formattedDateString = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
      const date = new Date(formattedDateString);
      console.log('La fecha del dolor:');
      console.log(date);
      return date;
    } return today;
  }

  perfectEvents(): EventCalendar[]{
    this.eventsCalendar.forEach(object => object.start = this.typescriptStringToDate(object.start));
    console.log(this.eventsCalendar);
    return this.eventsCalendar;
  }

}
