// current date time
export const getDateTime=()=>{
    let currDate=new Date();
    return {
        year:currDate.getFullYear(),
        day:currDate.getDay(),
        month:currDate.getMonth(),
        hours:currDate.getHours(),
        minute:currDate.getMinutes(),
        second:currDate.getSeconds()
    }
};