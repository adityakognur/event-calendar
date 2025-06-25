import React from "react";
import { useDrag } from "react-dnd";
import '../style.css'

const EventItem = ({ event, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "EVENT",
    item: { eventId: event.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      className="event-item"
      style={{
        background: event.color || "#2563eb",
        color: "#fff",
        opacity: isDragging ? 0.6 : 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={event.title}
    >
      {event.title}
    </div>
  );
};

export default EventItem;