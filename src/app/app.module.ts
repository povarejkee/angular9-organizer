import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { CalendarComponent } from './calendar/calendar.component'
import { OrganizerComponent } from './organizer/organizer.component'
import { SelectorComponent } from './selector/selector.component'
import { MomentPipe } from './shared/moment.pipe'
import { DateService } from './shared/date.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    OrganizerComponent,
    SelectorComponent,
    MomentPipe,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [DateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
