import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IGetFBResponse, IPostFBResponse, ITask } from './interfaces'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  static fbUrl: string = 'https://angular-calendar-todos.firebaseio.com/tasks'

  constructor(private http: HttpClient) {}

  addTask(task: ITask): Observable<ITask> {
    return this.http
      .post<IPostFBResponse>(`${TasksService.fbUrl}/${task.date}.json`, task)
      .pipe(
        map((response: IPostFBResponse) => {
          return {
            ...task,
            id: response.name,
          }
        })
      )
  }

  getTasks(date: string): Observable<ITask[]> {
    return this.http
      .get<IGetFBResponse>(`${TasksService.fbUrl}/${date}.json`)
      .pipe(
        map((response: IGetFBResponse) => {
          if (response) {
            const ids: string[] = Object.keys(response)

            return ids.map((id: string) => {
              return {
                ...response[id],
                id,
              }
            })
          } else {
            return []
          }
        })
      )
  }

  removeTask(task: ITask): Observable<void> {
    return this.http.delete<void>(
      `${TasksService.fbUrl}/${task.date}/${task.id}.json`
    )
  }
}
