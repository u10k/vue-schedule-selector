// @flow

import isBefore from 'date-fns/is_before'
import startOfDay from 'date-fns/start_of_day'

import * as dateUtils from '../../utils/date-utils'

const square = (selectionStart, selectionEnd, dateList) => {
  let selected = []
  if (selectionEnd == null) {
    if (selectionStart) selected = [selectionStart]
  } else if (selectionStart) {
    const dateIsReversed = isBefore(startOfDay(selectionEnd), startOfDay(selectionStart))
    const timeIsReversed = selectionStart.getHours() > selectionEnd.getHours()

    selected = dateList.reduce(
      (acc, dayOfTimes) =>
        acc.concat(
          dayOfTimes.filter(
            t =>
              selectionStart &&
              selectionEnd &&
              dateUtils.dateIsBetween(
                dateIsReversed ? selectionEnd : selectionStart,
                t,
                dateIsReversed ? selectionStart : selectionEnd
              ) &&
              dateUtils.timeIsBetween(
                timeIsReversed ? selectionEnd : selectionStart,
                t,
                timeIsReversed ? selectionStart : selectionEnd
              )
          )
        ),
      []
    )
  }

  return selected
}

export default square
