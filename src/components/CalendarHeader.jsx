import React, { useState, useRef, useEffect } from "react";
import { format, getYear } from "date-fns";

const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const getYearRange = (centerYear, range = 10) => {
  const years = [];
  for (let i = centerYear - range; i <= centerYear + range; i++) {
    years.push(i);
  }
  return years;
};

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth, setMonthAndYear }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const year = getYear(currentMonth);
  const month = currentMonth.getMonth();
  const monthYearRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (monthYearRef.current && !monthYearRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // For select options
  const handleMonthChange = (e) => {
    setMonthAndYear(parseInt(e.target.value), year);
    setDropdownOpen(false);
  };
  const handleYearChange = (e) => {
    setMonthAndYear(month, parseInt(e.target.value));
    setDropdownOpen(false);
  };

  const years = getYearRange(year, 10);

  return (
    <div className="calendar-header">
      <button
        onClick={prevMonth}
        className="calendar-header-btn"
        aria-label="Previous Month"
        type="button"
      >
        &lt;
      </button>
      <span className="calendar-title" ref={monthYearRef} style={{ position: "relative", cursor: "pointer" }}>
        <span onClick={() => setDropdownOpen((v) => !v)}>
          {MONTHS[month]} {year}
        </span>
        {dropdownOpen && (
          <div className="calendar-dropdown">
            <select
              className="calendar-dropdown-select"
              value={month}
              onChange={handleMonthChange}
              autoFocus
            >
              {MONTHS.map((m, idx) => (
                <option key={m} value={idx}>{m}</option>
              ))}
            </select>
            <select
              className="calendar-dropdown-select"
              value={year}
              onChange={handleYearChange}
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}
      </span>
      <button
        onClick={nextMonth}
        className="calendar-header-btn"
        aria-label="Next Month"
        type="button"
      >
        &gt;
      </button>
    </div>
  );
};

export default CalendarHeader;