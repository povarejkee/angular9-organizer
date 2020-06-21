import { Component, OnInit } from '@angular/core'
import { IDay } from '../shared/interfaces'
import { DateService } from '../shared/date.service'
import * as moment from 'moment'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public monthCanvas: IDay[][] = []
  public weekDays: string[] = moment.weekdaysShort(true)

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.dateService.momentDate.subscribe((state: moment.Moment) => {
      const start: moment.Moment = state
        .clone()
        .startOf('month')
        .startOf('week')
      const end: moment.Moment = state.clone().endOf('month').endOf('week')
      const whileIterator: moment.Moment = start.clone().subtract(1, 'day')
      const data: IDay[][] = []

      while (whileIterator.isBefore(end)) {
        data.push(
          new Array(7).fill(null).map(
            (): IDay => {
              const value: moment.Moment = whileIterator.add(1, 'day').clone()

              return {
                value,
                now: value.isSame(moment(), 'date'),
                selected: value.isSame(state, 'date'),
                disabled: !value.isSame(state, 'month'),
              }
            }
          )
        )
      }

      this.monthCanvas = data
    })
  }

  setDay(day: IDay) {
    if (day.disabled) {
      return
    } else {
      this.dateService.setDay(day.value)
    }
  }
}
