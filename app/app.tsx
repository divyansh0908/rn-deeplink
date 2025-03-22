/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./utils/gestureHandler"
import { initI18n } from "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import { useEffect, useState } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import * as SplashScreen from "expo-splash-screen"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import Config from "./config"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { loadDateFnsLocale } from "./utils/formatDate"

/**
 * Key used for persisting navigation state in storage
 */
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * Deep linking configuration
 *
 * This configuration defines how URLs map to screens in the app.
 * It's used by React Navigation to handle deep links.
 *
 * @see https://reactnavigation.org/docs/configuring-links
 */
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
    // Deep link paths for Profile and Products screens
    // These allow direct navigation via URLs like:
    // - deeplinkapp://profile
    // - https://appdeeplink.netlify.app/profile
    Profile: "profile",
    Products: "products",
  },
}

/**
 * This is the root component of our app.
 * It handles initialization of various services and provides
 * the app with necessary providers and navigation.
 *
 * @returns {JSX.Element | null} The rendered App component or null during initialization
 */
export function App() {
  // Set up navigation persistence to maintain navigation state across app restarts
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Load custom fonts for the app
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

  // Track initialization of internationalization
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  // Initialize internationalization and date formatting
  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  // Initialize and rehydrate the root store (MobX state)
  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    setTimeout(SplashScreen.hideAsync, 500)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (
    !rehydrated ||
    !isNavigationStateRestored ||
    !isI18nInitialized ||
    (!areFontsLoaded && !fontLoadError)
  ) {
    return null
  }

  /**
   * Deep linking configuration object for React Navigation
   * Includes all supported URL prefixes and the route mapping config
   */
  const linking = {
    // Define all URL schemes that the app can handle
    prefixes: [prefix, "deeplinkapp://", "com.deeplink.app://", "https://appdeeplink.netlify.app"],
    config,
  }

  // Once all initialization is complete, render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <KeyboardProvider>
          <AppNavigator
            linking={linking}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </KeyboardProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
