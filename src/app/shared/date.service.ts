import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as moment from 'moment'

moment.locale('ru')

Injectable({
  providedIn: 'root', // какого хуя не работает?
})
export class DateService {
  public momentDate: BehaviorSubject<moment.Moment> = new BehaviorSubject<
    moment.Moment
  >(moment())

  incrementSelector(): void {
    this.momentDate.value.add(1, 'month')
  }

  decrementSelector(): void {
    this.momentDate.value.subtract(1, 'month')
  }
}
