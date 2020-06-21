import * as moment from 'moment'

export interface IDay {
  value: moment.Moment
  now: boolean
  selected: boolean
  disabled: boolean
}

export interface ITask {
  title: string
  date: string
  id?: string
}

export interface IPostFBResponse {
  name: string
}

export interface IGetFBResponse {
  [key: string]: ITask
}
