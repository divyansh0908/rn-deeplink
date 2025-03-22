# React Native Deeplink Demo App

A demonstration application showcasing deeplink implementation in React Native. This app allows you to navigate directly to specific screens using custom URL schemes and universal links.

## Features

- **Multiple Screens**: Home, Login, Profile, and Products screens
- **Deeplink Support**: Navigate directly to screens using custom URL schemes and universal links
- **Cross-Platform**: Works on both iOS and Android

## Deeplink URLs

The app supports the following deeplink formats:

- Custom URL scheme: `deeplinkapp://profile` or `deeplinkapp://products`
- App-specific scheme: `com.deeplink.app://profile` or `com.deeplink.app://products`
- Universal links: `https://appdeeplink.netlify.app/profile` or `https://appdeeplink.netlify.app/products`

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- Yarn or npm
- React Native development environment set up ([React Native Environment Setup Guide](https://reactnative.dev/docs/environment-setup))
- Xcode (for iOS development)
- Android Studio (for Android development)

### Clone the Repository

```bash
git clone https://github.com/divyansh0908/rn-deeplink.git
cd rn-deeplink
```

### Install Dependencies

```bash
yarn install
# or
npm install
```

### Running the App

#### iOS

```bash
# Start Metro bundler
yarn start
# In a new terminal, run the iOS app
yarn ios
```

#### Android

```bash
# Start Metro bundler
yarn start
# In a new terminal, run the Android app
yarn android
```

## Testing Deeplinks

### iOS

#### Using Terminal

You can test deeplinks on iOS simulator using the `xcrun` command:

```bash
# Open the app first, then run:
xcrun simctl openurl booted "deeplinkapp://profile"
# or
xcrun simctl openurl booted "deeplinkapp://products"
```

#### Using Safari

1. Open Safari on your Mac
2. Enter the deeplink URL (e.g., `deeplinkapp://profile`)
3. Safari will prompt you to open the app

### Android

#### Using ADB

You can test deeplinks on Android emulator or device using ADB:

```bash
# Open the app first, then run:
adb shell am start -W -a android.intent.action.VIEW -d "deeplinkapp://profile" com.deeplink.app
# or
adb shell am start -W -a android.intent.action.VIEW -d "deeplinkapp://products" com.deeplink.app
```

#### Using Chrome

1. Open Chrome on your development machine
2. Enter the deeplink URL (e.g., `deeplinkapp://profile`)
3. Chrome will prompt you to open the app

### Testing Universal Links

To test universal links, you can use the following URLs in a browser:

- `https://appdeeplink.netlify.app/profile`
- `https://appdeeplink.netlify.app/products`

## Project Structure

- `/app`: Main application code
  - `/app/screens`: Screen components including Profile and Products screens
  - `/app/navigators`: Navigation configuration
  - `/app/app.tsx`: Main app component with deeplink configuration

## Built With

- [React Native](https://reactnative.dev/) - The framework used
- [React Navigation](https://reactnavigation.org/) - Navigation library with deeplink support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Ignite](https://github.com/infinitered/ignite) - The hottest React Native boilerplate
