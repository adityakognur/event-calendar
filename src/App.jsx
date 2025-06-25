import React, { useState } from "react";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './style.css'

function App() {
  const [events, setEvents] = useLocalStorage("events", []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Add/Edit
  const handleEventSave = (event) => {
    if (!event.id) {
      event.id = uuidv4();
      setEvents([...events, event]);
    } else {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    }
    setModalOpen(false);
  };

  // Delete
  const handleEventDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    setModalOpen(false);
  };

  // Drag & Drop
  const handleEventDrop = (eventId, newDate) => {
    setEvents(events.map((e) =>
      e.id === eventId ? { ...e, date: newDate.toISOString().split("T")[0] } : e
    ));
  };

  // Add or Edit from UI
  const handleDateClick = (date) => {
  // Format as YYYY-MM-DD in local time, not UTC
  const pad = (n) => n.toString().padStart(2, "0");
  const localDate = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
  setSelectedEvent({ date: localDate, time: "", recurrence: "none" });
  setModalOpen(true);
};
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="outer-container">
        <h1 className="calendar-title-main">Evently</h1>
        <Calendar
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          onEventDrop={handleEventDrop}
        />
        <EventModal
          isOpen={modalOpen}
          event={selectedEvent}
          onSave={handleEventSave}
          onDelete={selectedEvent?.id ? handleEventDelete : null}
          onClose={() => setModalOpen(false)}
        />
        <footer className="calendar-footer">
          Effortlessly plan your days with this React-powered calendar <span style={{fontSize: '0.97em', color: '#64748b'}}>.</span>
        </footer>
      </div>
    </DndProvider>
  );
}

export default App;