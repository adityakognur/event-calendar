import React from "react";
import EventForm from "./EventForm";
import '../style.css'

const EventModal = ({ isOpen, event, onSave, onDelete, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="event-modal-overlay">
      <div className="event-modal">
        <button
          className="event-modal-close"
          onClick={onClose}
        >
          ×
        </button>
        <EventForm event={event} onSave={onSave} onDelete={onDelete} onClose={onClose} />
      </div>
    </div>
  );
};
export default EventModal;