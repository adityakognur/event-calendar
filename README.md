# Calendar App

A modern, interactive calendar application built with React, Vite, and CSS.  
Effortlessly plan and view your events, with features like event recurrence, color coding, and professional UI.

## Features

- **Add, edit, delete events** with optional descriptions, recurrence, and color.
- **Month and year selection** via dropdown for fast navigation.
- **Time selection** with dropdowns for hour and minute.
- **Responsive & accessible** design.
- **Built using:**  
  - [React](https://reactjs.org/)  
  - [Vite](https://vitejs.dev/)  
  - CSS

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Run locally:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Folder Structure

```
src/
  components/       # React components (Calendar, Event Form, etc.)
  styles/           # CSS files
  utils/            # Helper functions (recurrence, formatting)
public/             # Static assets
```

## Customization

- **Event colors:** Easily extend the color choices in the event form.
- **Recurrence options:** Extend or modify repeat logic in `recurrenceOptions`.
