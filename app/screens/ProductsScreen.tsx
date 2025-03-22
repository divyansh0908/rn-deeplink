/**
 * ProductsScreen
 *
 * This screen displays a list of products and provides navigation
 * to other screens in the app. It's accessible via deeplinks using:
 * - deeplinkapp://products
 * - com.deeplink.app://products
 * - https://appdeeplink.netlify.app/products
 */
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

/**
 * Interface for ProductsScreen props
 * Extends the base navigation props for this screen
 */
interface ProductsScreenProps extends AppStackScreenProps<"Products"> {}

/**
 * Product interface defines the structure of product data
 */
interface Product {
  id: string
  name: string
  price: string
  description: string
}

/**
 * Mock product data for display
 * In a real app, this would come from an API or state management store
 */
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone",
    price: "$999",
    description: "Latest model with advanced features",
  },
  {
    id: "2",
    name: "Laptop",
    price: "$1299",
    description: "Powerful performance for work and play",
  },
  {
    id: "3",
    name: "Headphones",
    price: "$249",
    description: "Noise cancelling with premium sound quality",
  },
  {
    id: "4",
    name: "Smartwatch",
    price: "$349",
    description: "Track your fitness and stay connected",
  },
]

/**
 * ProductsScreen component
 * Displays a list of products and navigation options
 *
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object for screen transitions
 */
export const ProductsScreen: FC<ProductsScreenProps> = observer(function ProductsScreen({
  navigation,
}) {
  // Access the theme and themed styling utility
  const { themed } = useAppTheme()

  /**
   * Renders an individual product item
   *
   * @param {Object} params - Parameters passed by FlatList
   * @param {Product} params.item - The product data to render
   * @returns {JSX.Element} Rendered product item
   */
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={themed($productItem)}>
      <Text style={themed($productName)}>{item.name}</Text>
      <Text style={themed($productPrice)}>{item.price}</Text>
      <Text style={themed($productDescription)}>{item.description}</Text>
    </View>
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      {/* Screen title */}
      <Text preset="heading" style={themed($heading)}>
        Products
      </Text>

      {/* Screen subtitle */}
      <Text preset="subheading" style={themed($subheading)}>
        Browse our latest products
      </Text>

      {/* Product list */}
      <FlatList
        data={mockProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={themed($listContainer)}
      />

      {/* Navigation buttons */}
      <Button
        text="Go to Profile"
        style={themed($button)}
        preset="reversed"
        onPress={() => navigation.navigate("Profile")}
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

// Styling for the list container
const $listContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

// Styling for individual product items
const $productItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.md,
  padding: spacing.sm,
  borderRadius: 8,
  backgroundColor: colors.background,
  borderWidth: 1,
  borderColor: colors.border,
})

// Styling for product name text
const $productName: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 18,
  fontWeight: "bold",
  color: colors.text,
})

// Styling for product price text
const $productPrice: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  fontWeight: "bold",
  color: colors.tint,
  marginVertical: 4,
})

// Styling for product description text
const $productDescription: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  color: colors.textDim,
})

// Styling for buttons
const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
})
