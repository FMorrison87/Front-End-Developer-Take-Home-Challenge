 //format time
 export const formatDate = (timestamp, year) => {
    //convert from unix time to milliseconds
    let date = new Date(timestamp);
    if (year) {
      date = new Intl.DateTimeFormat('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }).format(date);
    } else {
      date = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }).format(date);
    }
    return date;
  }