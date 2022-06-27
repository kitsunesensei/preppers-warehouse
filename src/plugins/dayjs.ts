import * as dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'
import 'dayjs/locale/de'

dayjs.extend(isLeapYear)
dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)

export default dayjs
