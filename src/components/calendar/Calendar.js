import React, { useState } from 'react'
import * as datefns from "date-fns"
import "../calendar/Calendar.css"

export default function Calendar() {

    const formatOfYear  = 'yyy';
    const formatOfMonth = 'MMM';
    const formatOfWeek  = 'eee';
    const formatOfDay   = 'd';

    const today = new Date(); 

    const [currentDate, setCurrentDate] = useState(new Date());
    //console.log(currentDate);

    const [selectedDate, setselectedDate] = useState(new Date());
    
    const firstDay = datefns.startOfMonth(currentDate);
    //console.log(firstDay);

    const lastDay = datefns.lastDayOfMonth(currentDate);
   // console.log(lastDay);

   const weekendFirstDate = datefns.startOfWeek(firstDay);
  // console.log(weekFirstDate);

   const weekendLastDate = datefns.lastDayOfWeek(lastDay);
    //console.log(weekendLastDate);

   const intervals = datefns.eachDayOfInterval({ start : weekendFirstDate, end : weekendLastDate});
    console.log(intervals);

    const weeks = ((date)=>{
        const weeks = [];
        for( let day =1; day<=7; day++){
            weeks.push(date[day]);
        }
        return weeks;
    })(intervals);

    const isToday = (day)=> datefns.isSameDay(day, today);
    const isselectedDate = day=>datefns.isSameDay(day, selectedDate);
  return (
    <>
    <div className=" container-fluid">
        <div className="row align items-center">
            <div className=" box  col-md-8">

                <div style={{ display: "flex", justifyContent: "space-around"}}>
                    <button
                     onClick={()=> setCurrentDate(datefns.subMonths(currentDate, 1))}>
                     last
                     </button>
                    <span>{datefns.format(currentDate, formatOfMonth)} {datefns.format(currentDate, formatOfYear)}</span>
                    <button
                    onClick={()=> setCurrentDate(datefns.addMonths(currentDate, 1))}
                    >next
                    </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap:"1rem"}}>
                {weeks.map((week)=>(
                    <span>{datefns.format(week, formatOfWeek)}</span>
                ))}
                
              {intervals.map((date)=>(

                <div style={{ color:  
                 !datefns.isSameMonth(date, currentDate)? "#ddd" :
                 isselectedDate(date)? "blue":isToday(date)? "green"
                : datefns.isWeekend(date, currentDate)? "red"
                :""}}
                onClick = {()=> setselectedDate(date)}
                >

                  {datefns.format(date, formatOfDay)} 
                  
                </div>
              ))}
              
              </div>
            </div>
        </div>
    </div>
    </>
  )
}
