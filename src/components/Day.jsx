import React from "react";
import { isSameMonth, isSameDay, format, parseISO } from "date-fns";
import { useDrop } from "react-dnd";
import EventItem from "./EventItem";
import '../style.css'

const Day = ({ day, monthStart, events, onDateClick, onEventClick, onEventDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "EVENT",
    drop: (item) => onEventDrop(item.eventId, day),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // Events for this day
  const eventsForDay = events.filter((e) =>
    isSameDay(parseISO(e.date), day)
  );

  let className = "calendar-day";
  if (!isSameMonth(day, monthStart)) className += " calendar-day--other";
  if (isSameDay(day, new Date())) className += " calendar-day--today";
  // Optionally add a style or class for drag-over

  return (
    <div
      ref={drop}
      className={className}
      onClick={() => onDateClick(day)}
    >
      <div>
        <span className="calendar-day-number">{format(day, "d")}</span>
      </div>
      <div className="calendar-day-events">
        {eventsForDay.map((e) => (
          <EventItem key={e.id + e.date} event={e} onClick={() => onEventClick(e)} />
        ))}
      </div>
    </div>
  );
};

export default Day;