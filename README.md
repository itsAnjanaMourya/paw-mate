# Paw Mate – Pet Shop Mobile App

A React Native mobile application for browsing pets, adding new pet listings, and managing a shopping cart. Built with Expo for cross-platform support on Android and iOS.

## Demo

```markdown
[▶ View App Demo](demo/app-demo.mp4)
```

---

## Table of Contents

- [Demo](#demo)
- [Setup Instructions](#setup-instructions)
- [Platform Details](#platform-details)
- [Libraries Used](#libraries-used)
- [Architecture Overview](#architecture-overview)
- [Third-Party APIs](#third-party-apis)

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**
- **Expo CLI** (installed globally or via npx)
- **Expo Go** app on your device (for development), or Android Studio / Xcode for emulators

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-shop-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on a device or emulator**
   - **Expo Go**: Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - **Android emulator**: Press `a` in the terminal or run `npm run android`
   - **iOS simulator**: Press `i` in the terminal or run `npm run ios`
   - **Web**: Run `npm run web` or press `w` in the terminal

### Environment Notes

- **ReqRes API**: The app uses ReqRes.in for submitting pet details. An API key is configured in `services/api.js`. For production, move this to an environment variable.
- **Network**: Ensure your device/emulator has internet access for API calls (random dog images, pet submission).

---

## Platform Details

| Platform | Support | Notes |
|----------|---------|------|
| **Android** | ✅ | Tested on Android 5.0+; uses adaptive icon |
| **iOS** | ✅ | Supports iPhone and iPad |
| **Web** | ✅ | Via `expo start --web` |

### Configuration (app.json)

- **App name**: Paw-Mate
- **Package**: `com.anonymous.pawmate`
- **Orientation**: Portrait
- **Expo SDK**: ~54.x

---

## Libraries Used

| Library | Version | Purpose |
|---------|---------|---------|
| **expo** | ~54.0.33 | Cross-platform framework, build tooling |
| **react-native** | 0.81.5 | Mobile UI framework |
| **react** | 19.1.0 | UI library |
| **@react-navigation/native** | ^7.1.28 | Navigation container |
| **@react-navigation/native-stack** | ^7.13.0 | Stack navigator for screen transitions |
| **zustand** | ^5.0.11 | Global state management (cart, pets) |
| **react-hook-form** | ^7.71.1 | Form state and validation |
| **@hookform/resolvers** | ^5.2.2 | Yup resolver for react-hook-form |
| **yup** | ^1.7.1 | Schema-based form validation |
| **axios** | ^1.13.5 | HTTP client for API requests |
| **expo-image-picker** | ~17.0.10 | Camera and gallery access |
| **expo-status-bar** | ~3.0.9 | Status bar styling |
| **react-native-safe-area-context** | ~5.6.0 | Safe area handling for notched devices |
| **react-native-screens** | ~4.16.0 | Native screen components for navigation |
| **@expo/vector-icons** | ^15.0.3 | Icon set (MaterialCommunityIcons, etc.) |

---

## Architecture Overview

```
pet-shop-app/
├── App.js                 # Root component, navigation setup
├── index.js               # Entry point (Expo registerRootComponent)
├── app.json               # Expo configuration
│
├── screens/
│   ├── SplashScreen.js    # Initial splash, auto-navigates to HomeScreen
│   ├── HomeScreen.js   # Pet listing + featured pet card
│   ├── AddPetScreen.js    # Add pet form (image, name, breed, age, price)
│   └── CartScreen.js      # Shopping cart with quantity controls
│
├── components/
│   ├── PetCard.js         # Pet card (image, details, add to cart)
│   └── CustomToast.js     # Toast notifications
│
├── store/
│   ├── cartStore.js       # Zustand store: cart items, add/remove, total
│   └── petsStore.js      # Zustand store: pet list, add pet
│
├── services/
│   └── api.js             # API calls (submit pet, fetch random dog)
│
├── validation/
│   └── petSchema.js       # Yup schema for pet form validation
│
└── theme/
    └── colors.js          # App-wide color palette
```

### Data Flow

1. **Navigation**: Stack navigator (Splash → HomeScreen → AddPet / Cart)
2. **State**: Zustand stores (`cartStore`, `petsStore`) for global cart and pet list
3. **Forms**: react-hook-form + Yup for AddPet validation
4. **API**: Centralized in `services/api.js`; used by AddPetScreen and HomeScreen

### Screen Flow

```
Splash (3s) → HomeScreen
                  ├── Add Pet → AddPetScreen → (submit) → HomeScreen
                  └── Cart → CartScreen
```

---

## Third-Party APIs

### 1. ReqRes.in – Submit Pet Details

- **Endpoint**: `POST https://reqres.in/api/users`
- **Purpose**: Mock API for submitting pet details (name, breed, age, price, image).
- **Reason**: ReqRes.in is a well-known mock REST API used for testing and demos. It simulates a backend without requiring a real server, making it ideal for development and assignment evaluation. The API returns a success response and echoes the submitted data.

### 2. Dog CEO API – Random Dog Images

- **Endpoint**: `GET https://dog.ceo/api/breeds/image/random`
- **Purpose**: Fetches a random dog image URL for the “Random Dog” card on the pet list.
- **Reason**: Dog CEO API is a free, public API that provides random dog breed images. It adds visual variety to the app and demonstrates API integration. No authentication is required, and it is widely used for frontend demos and learning.

---

## License

Private project.
