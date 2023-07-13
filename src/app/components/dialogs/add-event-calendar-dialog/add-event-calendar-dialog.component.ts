import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventCalendar } from './../../../interfaces/event';


@Component({
  selector: 'app-add-event-calendar-dialog',
  templateUrl: './add-event-calendar-dialog.component.html',
  styleUrls: ['./add-event-calendar-dialog.component.css']
})
export class AddEventCalendarDialogComponent implements OnInit {
  form: FormGroup;
  eventCalendarForm: EventCalendar;

  constructor(private readonly fb: FormBuilder) {
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
    return newDate;
  }

  private formToEventCalendarObject(){
    const dateWithTime = this.addTimeToDate(this.form.get('start').value, this.form.get('hour').value);

     this.eventCalendarForm = {
       start: dateWithTime,
       title: this.form.get('title').value,
       description: this.form.get('description').value,
     };  
  }

  submit() {
    this.formToEventCalendarObject();
    console.log(this.eventCalendarForm);
  }

}
