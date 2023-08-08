import moment from 'moment'

/**
 * Display formatted time for postings
 * @param date time 
 * @returns formatted time
 */
const getPostDate = (time) => {
  const timeDiff = moment().diff(moment(time), 'hours')
  
  if (timeDiff < 1) {
    const min = moment().diff(moment(time), 'minutes')
    if (min < 1) return "<1m"
    else return min + "m"
  }
  else if (timeDiff < 24) {
    return timeDiff + "h"
  }
  else {
    return moment(time).format("YYYY-DD-MM")
  }
}

export default getPostDate