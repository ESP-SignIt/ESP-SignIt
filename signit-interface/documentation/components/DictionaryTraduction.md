# DictionaryTraduction Component

## Overview
The DictionaryTraduction component is a sophisticated gesture recognition system that uses webcam input to detect and translate sign language gestures in real-time. It integrates with MediaPipe for hand gesture recognition and provides a user interface for capturing and processing sign language gestures.

## Features
- Real-time webcam gesture recognition
- Hand landmark visualization
- Gesture confidence scoring
- Start/Stop recording functionality
- Data collection and processing
- Mirrored video display for intuitive interaction

## Props
This component does not accept any props.

## Usage
```tsx
import DictionaryTraduction from '../components/Dictionary/DictionaryTraduction';

function App() {
  return (
    <div>
      <DictionaryTraduction />
    </div>
  );
}
```

## Implementation Details
- Uses MediaPipe Tasks Vision for gesture recognition
- Implements webcam capture using react-webcam
- Provides real-time gesture detection and visualization
- Collects and processes gesture data during recording sessions
- Generates unique IDs for each recording session using UUID

## State Management
- `webcamRunning`: Controls webcam state
- `gestureOutput`: Stores current gesture detection
- `gestureRecognizer`: Manages MediaPipe gesture recognizer
- `runningMode`: Controls recognition mode (VIDEO/IMAGE)
- `progress`: Tracks gesture confidence score
- `showLandmarks`: Controls landmark visualization
- `detectedData`: Stores collected gesture data

## Dependencies
- @mediapipe/tasks-vision
- react-webcam
- uuid
- React (useState, useEffect, useRef, useCallback)

## CSS Classes
- `signlang_detection-container`: Main container styling
- `signlang_webcam`: Webcam element styling
- `signlang_canvas`: Canvas overlay styling
- `signlang_data-container`: Data display container
- `camera-button-container`: Button container styling

## Notes
- The component requires a webcam to function
- Gesture recognition accuracy depends on lighting conditions and hand visibility
- The component automatically mirrors the video feed for intuitive interaction
- Landmark visualization can be toggled for debugging purposes
- Gesture data is collected and processed when recording is stopped 