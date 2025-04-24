# ESP-SignIt Libraries and Dependencies

This document lists and explains all the packages used in the ESP-SignIt application.

## Core Dependencies

### React and TypeScript
- `react` (^18.3.1): The core React library for building user interfaces
- `react-dom` (^18.3.1): React rendering for web
- `typescript` (^4.4.2): JavaScript with syntax for types
- `@types/react` (^18.0.0): TypeScript definitions for React
- `@types/react-dom` (^18.0.0): TypeScript definitions for React DOM

### Routing
- `react-router-dom` (6.16.0): Client-side routing for React applications

### UI Components and Styling
- `@mui/material` (^6.1.2): Material-UI component library
- `@mui/icons-material` (^6.1.2): Material-UI icons
- `@emotion/react` (^11.13.3): CSS-in-JS library
- `@emotion/styled` (^11.13.0): Styled components for Emotion
- `@fontsource/roboto` (^5.1.0): Roboto font from Google Fonts

### MediaPipe Integration
- `@mediapipe/tasks-vision` (^0.10.3): Core MediaPipe vision tasks
- `@mediapipe/hands` (^0.4.1675469240): Hand tracking functionality
- `@mediapipe/drawing_utils` (^0.3.1675466124): Utilities for drawing hand landmarks

### Webcam Integration
- `react-webcam` (^7.2.0): React component for accessing webcam

### Utilities
- `uuid` (^11.0.3): Generate unique identifiers
- `web-vitals` (^2.1.0): Measure web vitals metrics

## Development Dependencies

### Testing
- `@testing-library/react` (^13.0.0): Testing utilities for React
- `@testing-library/jest-dom` (^5.14.1): DOM testing utilities
- `@testing-library/user-event` (^13.2.1): User event simulation for testing
- `cypress` (^14.3.0): End-to-end testing framework
- `@types/cypress` (^1.1.6): TypeScript definitions for Cypress

### Linting and Code Quality
- `eslint` (^8.57.1): JavaScript linter
- `@typescript-eslint/eslint-plugin` (^8.8.0): ESLint plugin for TypeScript
- `@typescript-eslint/parser` (^8.8.0): TypeScript parser for ESLint
- `eslint-config-react-app` (^7.0.1): ESLint configuration for React apps
- `eslint-plugin-react` (^7.37.1): ESLint plugin for React
- `eslint-plugin-react-hooks` (^4.6.2): ESLint plugin for React Hooks
- `@eslint/js` (^9.11.1): ESLint JavaScript configuration
- `globals` (^15.10.0): Global variables for ESLint

### Type Definitions
- `@types/jest` (^27.0.1): TypeScript definitions for Jest
- `@types/node` (^16.7.13): TypeScript definitions for Node.js
- `@types/react-router-dom` (^5.3.3): TypeScript definitions for React Router

### Build Tools
- `react-scripts` (5.0.1): Create React App build scripts
- `@babel/plugin-proposal-private-property-in-object` (^7.21.11): Babel plugin for private properties

## Usage in the Project

### Core Functionality
- React and TypeScript form the foundation of the application
- React Router handles navigation between different sections
- Material-UI provides the component library and styling system

### Sign Language Recognition
- MediaPipe packages handle hand tracking and gesture recognition
- React Webcam provides webcam access for gesture capture
- Drawing utilities visualize hand landmarks and gestures

### Development and Testing
- ESLint ensures code quality and consistency
- Cypress provides end-to-end testing capabilities
- TypeScript provides type safety throughout the application

### Performance Monitoring
- Web Vitals helps monitor application performance metrics
- UUID generates unique identifiers for tracking sessions and gestures 