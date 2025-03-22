/**
 * ProfileScreen
 *
 * This screen displays user profile information and provides navigation
 * to other screens in the app. It's accessible via deeplinks using:
 * - deeplinkapp://profile
 * - com.deeplink.app://profile
 * - https://appdeeplink.netlify.app/profile
 */
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

/**
 * Interface for ProfileScreen props
 * Extends the base navigation props for this screen
 */
interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

/**
 * ProfileScreen component
 * Displays user profile information and navigation options
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object for screen transitions
 */
export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen({
  navigation,
}) {
  // Access the theme and themed styling utility
  const { themed } = useAppTheme()

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      {/* Screen title */}
      <Text preset="heading" style={themed($heading)}>
        Profile Screen
      </Text>

      {/* Screen subtitle */}
      <Text preset="subheading" style={themed($subheading)}>
        This is your profile information
      </Text>

      {/* User profile information */}
      <Text style={themed($profileInfo)}>Name: Divyansh Anand</Text>
      <Text style={themed($profileInfo)}>Email: div.gyan09@gmail.com</Text>
      <Text style={themed($profileInfo)}>Member since: January 2023</Text>

      {/* Navigation buttons */}
      <Button
        text="Go to Products"
        style={themed($button)}
        preset="reversed"
        onPress={() => navigation.navigate("Products")}
      />

      <Button
        text="Go Back"
        style={themed($button)}
        preset="default"
        onPress={() => navigation.goBack()}
      />
    </Screen>
  )
})

/**
 * Styles
 * Using ThemedStyle for dynamic styling based on the current theme
 */

// Container styling for the screen content
const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

// Styling for the main heading
const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

// Styling for the subheading
const $subheading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

// Styling for profile information text
const $profileInfo: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.md,
  fontSize: 16,
  color: colors.text,
})

// Styling for buttons
const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
