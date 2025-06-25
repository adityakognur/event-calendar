import React, { useState } from "react";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, subMonths, isSameMonth, isSameDay, format, setMonth, setYear
} from "date-fns";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import { getEventsForCalendar } from "../utils/recurrence";

const Calendar = ({ events, onDateClick, onEventClick, onEventDrop }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  // Expand recurrences
  const allEvents = getEventsForCalendar(events, startDate, endDate);

  // Weekdays
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      <div key={i} className="calendar-weekday">
        {format(addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), i), "EEE")}
      </div>
    );
  }

  // Calendar grid
  const rows = [];
  let days = [];
  let day = startDate;
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(
        <Day
          key={day}
          day={day}
          monthStart={monthStart}
          events={allEvents}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
          onEventDrop={onEventDrop}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="calendar-grid" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  // For dropdown month/year select
  const setMonthAndYear = (month, year) => {
    const newDate = setYear(setMonth(currentMonth, month), year);
    setCurrentMonth(newDate);
  };

  return (
    <div className="calendar-container">
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
        nextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
        setMonthAndYear={setMonthAndYear}
      />
      <div className="calendar-grid">{weekDays}</div>
      <div>{rows}</div>
    </div>
  );
};

export default Calendar;