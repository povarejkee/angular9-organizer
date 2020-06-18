import * as moment from 'moment'

export interface IDay {
  value: moment.Moment
  now: boolean
  selected: boolean
  disabled: boolean
}
