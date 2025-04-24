# ImageAlphabet Component

## Overview
The ImageAlphabet component displays a grid of sign language alphabet images, showing how to sign each letter of the alphabet. It provides a visual reference for users learning sign language.

## Features
- Grid display of alphabet signs
- Responsive layout
- Evenly spaced images
- Alt text for accessibility

## Props
This component does not accept any props.

## Usage
```tsx
import ImageAlphabet from '../components/ImageAlphabet/ImageAlphabet';

function App() {
  return (
    <div>
      <ImageAlphabet />
    </div>
  );
}
```

## Implementation Details
- Uses a flex container for responsive grid layout
- Imports images from the assets directory
- Maps through a predefined list of alphabet images
- Applies consistent styling to all images

## Styling
The component uses inline styles for layout:
- Flex container with wrap enabled
- Justified content with even spacing
- Centered alignment
- Consistent margin for all images

## Data Structure
The component uses an `ImageList` interface:
```typescript
interface ImageList {
    id: number;
    src: string;
    alt: string;
}
```

## Dependencies
- Local image assets from the alphabet directory
- TypeScript for type safety

## Notes
- Images are imported from the assets/alphabet directory
- Each image has a unique ID and descriptive alt text
- The layout automatically adjusts to container width
- Images maintain consistent spacing and alignment 