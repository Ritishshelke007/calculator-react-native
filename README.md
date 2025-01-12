# React Native Calculator App

A modern, feature-rich calculator app built with React Native and Expo. This calculator offers both standard and scientific calculation modes with a sleek, dark-themed UI.

## Features

### Standard Calculator
- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Percentage calculations
  - Direct percentage (e.g., 50% of 100)
  - Percentage in operations (e.g., 100 + 50%)
- Sign toggle (positive/negative)
- Decimal operations
- Clear function (C)

### Scientific Calculator
- All standard calculator features
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log)
- Square root (√)
- Power functions (x², xʸ)
- Constants (π, e)
- Factorial calculations (!)
- Parentheses support

### Additional Features
- Calculation History
  - View previous calculations
  - Reuse previous results
  - Clear history option
  - Persistent storage
- Modern Dark Theme UI
- Responsive Design
- Portrait Mode Optimization
- "Calc by Ritish" Signature

## Technical Details

### Built With
- React Native
- Expo
- React Hooks for state management
- AsyncStorage for persistent history
- Custom animations and transitions

### Project Structure
```
calculator-app/
├── src/
│   ├── components/
│   │   ├── StandardCalculator.js
│   │   ├── ScientificCalculator.js
│   │   └── History.js
│   └── hooks/
│       └── useCalculator.js
├── App.js
├── app.json
└── package.json
```

## Installation

1. Make sure you have Node.js and npm installed
2. Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```
3. Clone the repository and install dependencies:
   ```bash
   cd calculator-app
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Use Expo Go on your mobile device to scan the QR code
3. Or run on an emulator:
   ```bash
   npm run android
   # or
   npm run ios
   ```

## Building APK

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Login to your Expo account:
   ```bash
   eas login
   ```
3. Build the APK:
   ```bash
   eas build -p android --profile preview
   ```

## Features in Detail

### Calculator Modes
- **Standard Mode**: Perfect for basic calculations and everyday use
- **Scientific Mode**: Advanced functions for complex mathematical operations
- **History Mode**: Access to previous calculations and results

### Smart Calculation Handling
- Automatic decimal point management
- Intelligent operation chaining
- Error prevention for invalid operations
- Smart percentage calculations in both standalone and operation modes

### User Interface
- Tab-based navigation
- Large, easy-to-read display
- Color-coded buttons for different operations
- Comfortable button spacing
- Bottom signature with proper spacing

## Author
Created by Ritish
