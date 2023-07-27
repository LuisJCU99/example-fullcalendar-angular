import { Time } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventCalendar } from 'src/app/interfaces/event';
import { MockServiceEventService } from 'src/app/services/mock-service-event.service';

@Component({
  selector: 'app-manage-event-calendar-dialog',
  templateUrl: './manage-event-calendar-dialog.component.html',
  styleUrls: ['./manage-event-calendar-dialog.component.css']
})
export class ManageEventCalendarDialogComponent implements OnInit {
  eventCalendarForm: EventCalendar;
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    start: new FormControl(''),
    hour: new FormControl('')
  })

  eventSelected: EventCalendar;
  eventCalendarId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private eventsCalendarService: MockServiceEventService,
    public dialogRef: MatDialogRef<ManageEventCalendarDialogComponent>
  ) {
    this.eventSelected = data.eventSelected;
    this.eventCalendarId = data.eventCalendarId;

  }

  ngOnInit(): void {
    console.log(this.eventSelected);
    if (typeof this.eventSelected['start'] === 'string') {

      const dateObject = this.convertStringToDate(this.eventSelected['start']);
      const timeObject = this.getTime(this.eventSelected['start']);
      console.log(timeObject);

      this.form = new FormGroup({
        title: new FormControl(this.eventSelected['title']),
        description: new FormControl(this.eventSelected['description']),
        start: new FormControl(dateObject),
        hour: new FormControl(timeObject)
      })
    }
  }

  // Función para convertir el string a tipo Date
  convertStringToDate(inputString: string): Date | null {
    const [dateString, timeString] = inputString.split(', ');
    const [day, month, year] = dateString.split('/').map(Number);
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);

    if (isNaN(dateObject.getTime())) {
      return null;
    }
    return dateObject;
  }

  // Función para obtener la cadena "15:47" a partir del string "14/7/2023, 15:47:00"
  getTime(cadena: string): string {
    const partes = cadena.split(',');
    const horaCompleta = partes[1].trim();
    const expresionRegular = /(\d{1,2}:\d{2}:\d{2})/;
    const horaExtraida = horaCompleta.match(expresionRegular);

    if (horaExtraida) {
      const horaFormateada = horaExtraida[0].split(':').map(part => part.padStart(2, '0')).join(':');
      return horaFormateada;
    }
    return "";
  }

  private addTimeToDate(date, time) {
    const newDate = new Date(date);
    const [hours, minutes] = time.split(":");
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    const stringNewDate = newDate.toLocaleString();
    return stringNewDate;
  }

  private formToEventCalendarObject() {
    const dateWithTime = this.addTimeToDate(this.form.get('start').value, this.form.get('hour').value);
    this.eventCalendarForm = {
      start: dateWithTime,
      title: this.form.get('title').value,
      description: this.form.get('description').value,
    };
  }

  edit() {
    this.formToEventCalendarObject();
    this.eventsCalendarService.updateEventCalendar(this.eventCalendarId, this.eventCalendarForm);
    this.dialogRef.close();
  }

  delete() {
    this.eventsCalendarService.deleteEventCalendar(this.eventCalendarId);
    this.dialogRef.close();
  }
}
