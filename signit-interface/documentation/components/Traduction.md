# Traduction Component

## Overview
The Traduction component is the main sign language translation interface that provides real-time gesture recognition using a webcam. It displays detected signs, shows hand landmarks, and maintains a history of signed letters.

## Features
- Real-time webcam gesture recognition
- Hand landmark visualization
- Gesture confidence scoring
- Signed letter history
- Responsive design
- Start/Stop functionality
- MediaPipe integration

## Props
This component does not accept any props.

## Usage
```tsx
import Traduction from '../components/Traduction/Traduction';

function App() {
  return (
    <div>
      <Traduction />
    </div>
  );
}
```

## Implementation Details
- Uses MediaPipe Tasks Vision for gesture recognition
- Implements webcam capture and processing
- Provides real-time gesture detection and visualization
- Maintains a history of detected signs
- Handles responsive layout for different screen sizes

## State Management
- `videoInput`: Controls video source
- `running`: Controls recognition state
- `isReady`: Tracks video readiness
- `recognizer`: Manages MediaPipe gesture recognizer
- `gesture`: Stores current gesture
- `score`: Tracks gesture confidence
- `showLandmarks`: Controls landmark visualization
- `signedLetters`: Maintains history of signed letters
- `currentLetter`: Tracks current letter being signed
- `isWide` and `isPhone`: Handle responsive layout

## Dependencies
- @mediapipe/tasks-vision
- React (useState, useEffect, useRef, useCallback)
- Local image assets

## CSS Classes
- `traduction-container`: Main container styling
- `signlang_video`: Video element styling
- `signlang_canvas`: Canvas overlay styling
- `controls`: Controls container styling
- `startDiv`: Start button container styling

## Functions
- `onLoaded`: Handles video metadata loading
- `loop`: Main prediction loop
- `onToggle`: Toggles recognition state
- `handleWheel`: Handles image navigation

## Notes
- The component requires a webcam to function
- Gesture recognition accuracy depends on lighting conditions
- Signed letters are displayed for 15 seconds before being removed
- The component automatically adjusts to different screen sizes
- Landmark visualization can be toggled for debugging
- The component uses GPU acceleration for better performance 