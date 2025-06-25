import { addDays, addWeeks, addMonths, isWithinInterval, isSameDay, parseISO } from "date-fns";

// Expand events to calendar
export function getEventsForCalendar(events, startDate, endDate) {
  let allEvents = [];
  events.forEach(event => {
    const eventDate = parseISO(event.date);
    switch (event.recurrence) {
      case "daily":
        for (let day = eventDate; day <= endDate; day = addDays(day, 1)) {
          if (day >= startDate) allEvents.push({ ...event, date: day.toISOString().split('T')[0] });
        }
        break;
      case "weekly":
        for (let day = eventDate; day <= endDate; day = addWeeks(day, 1)) {
          if (day >= startDate) allEvents.push({ ...event, date: day.toISOString().split('T')[0] });
        }
        break;
      case "monthly":
        for (let day = eventDate; day <= endDate; day = addMonths(day, 1)) {
          if (day >= startDate) allEvents.push({ ...event, date: day.toISOString().split('T')[0] });
        }
        break;
      default:
        if (isWithinInterval(eventDate, { start: startDate, end: endDate })) {
          allEvents.push(event);
        }
    }
  });
  return allEvents;
}