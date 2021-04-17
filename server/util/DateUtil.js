function getDateAndTimeWellFormatted(){
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1)+ '-' + today.getDate();
    let time = today.getHours() + ":" +
               ((today.getMinutes() < 10) ? "0" : "" ) + today.getMinutes() + ":" +
               today.getSeconds();
    return date + " " + time;
}

module.exports = {
    getDateAndTimeWellFormatted
}