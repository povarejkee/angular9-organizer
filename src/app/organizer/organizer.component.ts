import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DateService } from '../shared/date.service'
import * as moment from 'moment'
import { BehaviorSubject } from 'rxjs'
import { TasksService } from '../shared/tasks.service'
import { ITask } from '../shared/interfaces'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit {
  public form: FormGroup
  public date: BehaviorSubject<moment.Moment> = this.dateService.momentDate
  public tasks: ITask[] = []
  public isLoading: boolean = false

  constructor(
    private dateService: DateService,
    private tasksService: TasksService
  ) {}

  setTasks(): void {
    this.dateService.momentDate
      .pipe(
        switchMap((date: moment.Moment) => {
          this.isLoading = true
          return this.tasksService.getTasks(date.format('DD-MM-YYYY'))
        })
      )
      .subscribe((response: ITask[]) => {
        this.tasks = response
        this.isLoading = false
      })
  }

  ngOnInit(): void {
    this.setTasks()

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
    })
  }

  submitHandler() {
    const task: ITask = {
      title: this.form.value.title,
      date: this.date.value.format('DD-MM-YYYY'),
    }

    this.tasksService.addTask(task).subscribe((response: ITask) => {
      this.tasks.push(response)
      this.form.reset()
    })
  }

  remove(task: ITask): void {
    this.tasksService.removeTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t: ITask) => t.id !== task.id)
    })
  }
}
