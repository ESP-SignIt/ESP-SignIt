# Navbar Component

## Overview
The Navbar component serves as the main navigation bar for the ESP-SignIt application. It provides navigation between different sections of the app and displays the application logo.

## Features
- Responsive navigation bar
- Logo display with link to home page
- Navigation link to Translation section
- Automatic page reload on navigation to ensure proper component rendering

## Props
This component does not accept any props.

## Usage
```tsx
import { Navbar } from '../components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      {/* Other components */}
    </div>
  );
}
```

## Implementation Details
- Uses React Router's `useLocation` hook for navigation tracking
- Implements a page reload mechanism when navigation occurs
- Styled with CSS classes for responsive design
- Logo is imported from assets directory

## Dependencies
- react-router-dom
- React (useEffect, useState)

## CSS Classes
- `nav-link`: Default styling for navigation links
- `nav-link-selected`: Styling for the currently selected navigation link
- `flex`: Flexbox container styling
- `margin-right`: Adds right margin to elements

## Notes
- The component automatically reloads the page when navigation occurs to ensure proper component rendering
- The logo is clickable and links to the home page
- The navigation link styling changes based on the current route 