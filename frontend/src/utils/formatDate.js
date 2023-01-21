const formatDate = (date) => {
    let formattedDate = new Date(date)
    formattedDate = formattedDate.toString().split(" ")
    let shortDayName = formattedDate[0]
    let dayName = formattedDate[0]
    if(dayName === "Mon") dayName = "Monday"
    if(dayName === "Tue") dayName = "Tuesday"
    if(dayName === "Wed") dayName = "Wednesday"
    if(dayName === "Thu") dayName = "Thursday"
    if(dayName === "Fri") dayName = "Friday"
    if(dayName === "Sat") dayName = "Saturday"
    if(dayName === "Sun") dayName = "Sunday"
    let month = formattedDate[1]
    if (month === 'Jan') month = 'January'
    if (month === 'Feb') month = 'February'
    if (month === 'Mar') month = 'March'
    if (month === 'Apr') month = 'April'
    if (month === 'May') month = 'May'
    if (month === 'Jun') month = 'June'
    if (month === 'Jul') month = 'July'
    if (month === 'Aug') month = 'August'
    if (month === 'Sep') month = 'September'
    if (month === 'Oct') month = 'October'
    if (month === 'Nov') month = 'November'
    if (month === 'Dec') month = 'December'
    const day = formattedDate[2]
    const year = formattedDate[3]
    const unformattedTime = formattedDate[4].split(':')
    let hour = unformattedTime[0]
    let minute = unformattedTime[1]
    let timeZone = formattedDate[5].split('')[0]+formattedDate[5].split('')[1]+formattedDate[5].split('')[2]
    let ampm= 'am'
    if (hour > 12) {
        hour = hour - 12
        ampm = 'pm'
    }

    if(hour == '00'){
        hour = 12
        ampm = 'am'
    }
    const time = `${hour}:${minute} ${ampm} ${timeZone}`

    const shortMonth = formattedDate[1].toUpperCase()

    const timeObj = { dayName, month, day, year, time, shortMonth, shortDayName }
    return timeObj
}




export default formatDate
