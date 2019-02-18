import { ViewStyle, TextStyle, TouchableOpacityProperties } from "react-native"
import { ButtonPresetNames } from "./button.presets"
import {IconTypes} from "../icon/icons"

export interface ButtonProps extends TouchableOpacityProperties {
  icon?: IconTypes,
  /**
   * Text which is looked up via i18n.
   */
  iconPosition?: string,

  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: TextStyle

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode
}
