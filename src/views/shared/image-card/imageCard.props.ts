import { ViewStyle, TouchableOpacityProperties } from "react-native"
import { ImageCardPresetNames } from "./imageCard.presets"

export interface ImageCardProps extends TouchableOpacityProperties {
  image?: ImageData,

  imageUrl?: string
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle


  borderStyle?: number

  /**
   * One of the different types of text presets.
   */
  preset?: ImageCardPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode
}
