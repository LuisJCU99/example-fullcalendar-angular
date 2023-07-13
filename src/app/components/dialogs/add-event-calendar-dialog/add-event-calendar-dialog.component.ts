import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventCalendar } from './../../../interfaces/event';
import { MockServiceEventService } from 'src/app/services/mock-service-event.service';


@Component({
  selector: 'app-add-event-calendar-dialog',
  templateUrl: './add-event-calendar-dialog.component.html',
  styleUrls: ['./add-event-calendar-dialog.component.css']
})
export class AddEventCalendarDialogComponent implements OnInit {
  form: FormGroup;
  eventCalendarForm: EventCalendar;

  constructor(private readonly fb: FormBuilder,
              private eventsCalendarService: MockServiceEventService
    ) {
    this.form = this.fb.group({
      start: this.fb.control('', [Validators.required]),
      hour: this.fb.control('', [Validators.required]),
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', []),
    });
  }

  ngOnInit(): void {
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

  private formToEventCalendarObject(){
    const dateWithTime = this.addTimeToDate(this.form.get('start').value, this.form.get('hour').value);
     this.eventCalendarForm = {
       start: dateWithTime,
       title: this.form.get('title').value,
       description: this.form.get('description').value,
     };  
  }

  async submit() {
    this.formToEventCalendarObject();
    console.log(this.eventCalendarForm);
    const response = await this.eventsCalendarService.addEventCalendar(this.eventCalendarForm);
    console.log(response);
  }

}
