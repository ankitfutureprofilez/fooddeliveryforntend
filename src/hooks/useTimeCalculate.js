import React from 'react'

export default function useTimeCalculate() {

    function convert12to24(timeString) {
        if(timeString == null || undefined){
          return false
        }
        const format = timeString && timeString.slice(-2);
        const hours = timeString && timeString.slice(0, -2);
        // If time is 12 
        if (hours==12)
        {
          if(format=="am"){return 0;}
          else {return 12;}
        }
        if(format == 'am'){
          return hours;
        } else { 
          return +hours+12;
        }
    }
    
    function isOpen(openingTime, closingTime) {
    const s = convert12to24(openingTime);
    let e = convert12to24(closingTime);
    let date = new Date();
    const currenttime =  date.getHours(); 
    if(e<s){e=e+24;}
    
    if (e > currenttime & s <= currenttime ) {
        return "Open";
    } 
    else {return "Closed";}
    }

  return [isOpen]
}
