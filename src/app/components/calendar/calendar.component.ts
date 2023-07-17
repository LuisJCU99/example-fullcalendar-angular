import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import { EVENTS } from '../../mock-events';
import { AddEventCalendarDialogComponent } from '../dialogs/add-event-calendar-dialog/add-event-calendar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MockServiceEventService } from '../../services/mock-service-event.service';
import { EventCalendar } from '../../interfaces/event';
import { ManageEventCalendarDialogComponent } from '../dialogs/manage-event-calendar-dialog/manage-event-calendar-dialog.component';


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
        eventClick: this.openManageEventCalendarDialog.bind(this),
        //Elementos del header
        header: {
          left: 'prev,today,next',
          center: 'title',
          right: 'dayGridMonth'
        },

        //Elementos del footer
        // footer: {
        //   left: '',
        //   center: '',
        //   right: ''
        // },

        editable: false,
        // eventClick: function (info) {
        //   alert('Event: ' + info.event.title);
        // },
      },
        this.events = this.normalizedEvents();
    }
    );

  }

  typescriptStringToDate(dateString: String | Date): Date {
    var today = new Date();
    if (typeof (dateString) == 'string') {
      const [datePart, timePart] = dateString.split(", ");
      const [day, month, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");
      const formattedDateString = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
      const date = new Date(formattedDateString);
      return date;
    } return today;
  }

  normalizedEvents(): EventCalendar[] {
    this.eventsCalendar.forEach(object => object.start = this.typescriptStringToDate(object.start));
    console.log(this.eventsCalendar);
    return this.eventsCalendar;
  }

  openAddEventCalendarDialog() {
    const dialogRef = this.dialog.open(AddEventCalendarDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openManageEventCalendarDialog(arg) {
    const dialogRef = this.dialog.open(ManageEventCalendarDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
