import { Component } from '@angular/core'
import { DateService } from '../shared/date.service'
import { BehaviorSubject } from 'rxjs'
import * as moment from 'moment'

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent {
  public date: BehaviorSubject<moment.Moment> = this.dateService.momentDate

  constructor(private dateService: DateService) {}

  inc(): void {
    this.dateService.incrementSelector()
  }

  dec(): void {
    this.dateService.decrementSelector()
  }
}
