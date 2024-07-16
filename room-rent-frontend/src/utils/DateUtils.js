export default function getTimePassedFromUTC(utcTime) {
    const givenTime = new Date(utcTime)

    const now = new Date()
    if (givenTime > now) {
        return null
    }

    const timeDiffInMilliSeconds = now - givenTime
    const timeDiffInMinutes = Math.floor(timeDiffInMilliSeconds / (1000 * 60))

    if (timeDiffInMinutes < 60) {
        if (timeDiffInMinutes <= 1) {
            return "1 min ago"
        } else{
            return `${timeDiffInMinutes} mins ago`
        }
    }

    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60)

    if (timeDiffInHours < 24){
        if (timeDiffInHours == 1) {
            return "1 hr ago"
        } else {
            return `${timeDiffInHours} hrs ago`
        }
    }

    const timeDiffInDays = Math.floor(timeDiffInHours/24)
    if (timeDiffInDays < 30){
        if (timeDiffInDays === 1) {
            return "1 day ago"
        } else {
            return `${timeDiffInDays} days ago`
        }
    }

    const timeDiffInMonths = Math.floor(timeDiffInDays/30)
    if (timeDiffInMonths < 12){
        if (timeDiffInMonths == 1) {
            return "1 mo ago"
        } else {
            return `${timeDiffInHours} mos ago`
        }
    }

    const timeDiffInYears = Math.floor(timeDiffInMonths/12)
    if (timeDiffInYears < 24){
        if (timeDiffInHours == 1) {
            return "1 yr ago"
        } else {
            return `${timeDiffInHours} yrs ago`
        }
    }

}