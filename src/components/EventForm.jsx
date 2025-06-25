import React, { useState } from "react";
import '../style.css'

const recurrenceOptions = [
  { value: "none", label: "None" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const colors = [
  "#2563eb", "#059669", "#f59e42", "#d97706", "#d7263d", "#8b5cf6", "#f43f5e"
];

const EventForm = ({ event, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");
  const [desc, setDesc] = useState(event?.desc || "");
  const [recurrence, setRecurrence] = useState(event?.recurrence || "none");
  const [color, setColor] = useState(event?.color || "#2563eb");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    onSave({
      ...event,
      title, date, time, desc, recurrence, color,
    });
  };
  return (
  <form onSubmit={handleSubmit} className="event-form">
    <div className="event-header-container">
      <h1 className="event-header">Add an event</h1>
    </div>
    <div>
      <label className="event-form-label" htmlFor="event-title">Title</label>
      <input
        id="event-title"
        className="event-form-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        maxLength={40}
        placeholder="Title..."
      />
    </div>
    <div className="event-form-row">
      <div>
        <label className="event-form-label" htmlFor="event-date">Date</label>
        <input
          id="event-date"
          className="event-form-input"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="event-form-label" htmlFor="event-time">Time</label>
        <input
          id="event-time"
          className="event-form-input"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </div>
    </div>
    <div>
      <label className="event-form-label" htmlFor="event-desc">Description</label>
      <textarea
        id="event-desc"
        className="event-form-input"
        placeholder="Enter the description..."
        value={desc}
        onChange={e => setDesc(e.target.value)}
        rows={2}
      />
    </div>
    <div className="event-form-row">
      <div>
        <label className="event-form-label" htmlFor="event-recurrence">Recurrence</label>
        <select
          id="event-recurrence"
          className="event-form-input"
          value={recurrence}
          onChange={e => setRecurrence(e.target.value)}
        >
          {recurrenceOptions.map(o =>
            <option value={o.value} key={o.value}>{o.label}</option>
          )}
        </select>
      </div>
      <div>
        <label className="event-form-label" htmlFor="event-color">Color</label>
        <div className="event-form-color-group" id="event-color">
          {colors.map(c =>
            <span
              key={c}
              className={`event-form-color ${c === color ? "event-form-color--active" : ""}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
              title={c}
              tabIndex={0}
              role="button"
              aria-label={`Color ${c}`}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setColor(c)}
            />
          )}
        </div>
      </div>
    </div>
    <div className="event-form-actions">
      {onDelete &&
        <button type="button" className="event-form-delete" onClick={() => onDelete(event.id)}>
          Delete
        </button>
      }
      <button type="button" className="event-form-cancel" onClick={onClose}>
        Cancel
      </button>
      <button type="submit" className="event-form-save">
        Save
      </button>
    </div>
  </form>
);
};

export default EventForm;