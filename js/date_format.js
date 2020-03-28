function getCurrentDate() {
    let date = new Date();
    let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    let day;
    let month = months[date.getMonth()];
    switch (date.getDate()) {
        case 1:
        case 21:
            day = date.getDate() + "st";
            break;
        case 2:
        case 22:
            day = date.getDate() + "nd";
            break;
        case 3:
        case 23:
            day = date.getDate() + "rd";
            break;
        default:
            day = date.getDate() + "th"
            break;
    }
    return month + " " + day;
}


console.log(getCurrentDate());