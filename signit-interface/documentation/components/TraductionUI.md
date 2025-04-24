# TraductionUI Component

## Overview
The TraductionUI component serves as a container component that manages the display of either a tutorial or the main translation interface. It uses localStorage to remember user preferences regarding tutorial display.

## Features
- Conditional rendering of tutorial or main interface
- Persistent tutorial display preference
- Clean, margin-free layout
- Tutorial dismissal functionality

## Props
This component currently accepts an empty props interface, which can be extended for future functionality:
```typescript
interface Props { };
```

## Usage
```tsx
import { TraductionUI } from '../components/Traduction/TraductionUI';

function App() {
  return (
    <div>
      <TraductionUI />
    </div>
  );
}
```

## Implementation Details
- Uses React's useState hook for state management
- Integrates with localStorage for persistence
- Conditionally renders either TraductionTutorial or Traduction component
- Provides tutorial dismissal functionality

## State Management
- `displayTutorial`: Boolean state controlling which interface to display
  - Initialized from localStorage
  - Defaults to showing tutorial if not previously dismissed

## Functions
- `closeTutorial()`: Handles tutorial dismissal
  - Updates displayTutorial state to false
  - Called by the TraductionTutorial component

## Dependencies
- React (useState)
- Traduction component
- TraductionTutorial component

## Styling
The component uses inline styles for layout:
- Zero margin
- Zero padding
- Clean section layout

## Notes
- The tutorial display preference persists across sessions using localStorage
- The component provides a clean transition between tutorial and main interface
- The empty props interface allows for future extensibility
- The component follows a clean, modular design pattern 