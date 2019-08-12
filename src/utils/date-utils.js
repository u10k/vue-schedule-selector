// @flow

import startOfDay from 'date-fns/start_of_day'
import isAfter from 'date-fns/is_after'

// Helper function that uses date-fns methods to determine if a date is between two other dates
export const dateHourIsBetween = (start, candidate, end) =>
  (candidate.getTime() === start.getTime() || isAfter(candidate, start)) &&
  (candidate.getTime() === end.getTime() || isAfter(end, candidate))

export const dateIsBetween = (start, candidate, end) => {
  const startOfCandidate = startOfDay(candidate)
  const startOfStart = startOfDay(start)
  const startOfEnd = startOfDay(end)

  return (
    (startOfCandidate.getTime() === startOfStart.getTime() || isAfter(startOfCandidate, startOfStart)) &&
    (startOfCandidate.getTime() === startOfEnd.getTime() || isAfter(startOfEnd, startOfCandidate))
  )
}

export const timeIsBetween = (start, candidate, end) =>{
  // return new Date(candidate).getTime() >= new Date(start).getTime() && new Date(candidate).getTime() <= new Date(end).getTime()
  // return candidate.getHours() >= start.getHours() && candidate.getHours() <= end.getHours()
  let halfCan = candidate.getMinutes() === 30 ? 0.5 : 0;
  let halfStart = start.getMinutes() === 30 ? 0.5 : 0;
  let halfEnd = end.getMinutes() === 30 ? 0.5 : 0;
  return candidate.getHours() + halfCan >= start.getHours() + halfStart && candidate.getHours() + halfCan <= end.getHours() + halfEnd
}
