/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 *
 * This file defines the main navigation structure of the application and
 * configures the navigation stack with all available screens.
 */
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { useStores } from "../models"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { ComponentProps } from "react"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Demo: NavigatorScreenParams<DemoTabParamList>
  // Screens with deeplink support
  Profile: undefined
  Products: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

/**
 * Type for props passed to screens in the app stack
 * This provides proper type checking for navigation props
 */
export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Create the navigation stack
const Stack = createNativeStackNavigator<AppStackParamList>()

/**
 * AppStack component that defines the main navigation structure
 * This component observes the authentication state and renders
 * different screens based on whether the user is authenticated
 */
const AppStack = observer(function AppStack() {
  // Get authentication state from the store
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  // Get theme colors for styling
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: { backgroundColor: colors.background },
      }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {/* All screens are available regardless of authentication state */}
      <>
        <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
        <Stack.Screen name="Demo" component={DemoNavigator} />
        <Stack.Screen name="Profile" component={Screens.ProfileScreen} />
        <Stack.Screen name="Products" component={Screens.ProductsScreen} />
      </>
    </Stack.Navigator>
  )
})

/**
 * Interface for NavigationProps
 * Extends the props of NavigationContainer
 */
export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> {}

/**
 * Main AppNavigator component
 * Wraps the navigation structure with necessary providers and configuration
 *
 * @param props - Props for the NavigationContainer
 * @returns The configured navigation container
 */
export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  // Get theme configuration
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  // Handle back button presses (Android)
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  )
})
