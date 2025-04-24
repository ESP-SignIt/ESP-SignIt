# Dictionary Component

## Overview
The Dictionary component serves as a container for the dictionary functionality, displaying both the dictionary translation interface and the image alphabet side by side.

## Features
- Split-screen layout
- Dictionary translation section
- Image alphabet display
- Scrollable image alphabet section
- Responsive design

## Props
This component does not accept any props.

## Usage
```tsx
import { Dictionary } from '../components/Dictionary/Dictionary';

function App() {
  return (
    <div>
      <Dictionary />
    </div>
  );
}
```

## Implementation Details
- Uses a flex container for layout
- Splits the screen into two equal sections (50% each)
- Integrates DictionaryTraduction and ImageAlphabet components
- Implements custom styling for the image alphabet section

## Styling
The component uses inline styles for layout and appearance:
- Flex container with 85vh height
- 50% width for each section
- Custom styling for the image alphabet section:
  - 82vh height
  - Scrollable content
  - Gray background (#CCCCCC)
  - Orange border (#FFA600)
  - Rounded corners (10px border radius)
  - Padding and margin for spacing

## Dependencies
- DictionaryTraduction component
- ImageAlphabet component

## Notes
- The component creates a responsive layout that adapts to different screen sizes
- The image alphabet section is scrollable to accommodate varying amounts of content
- The styling is consistent with the application's design language 