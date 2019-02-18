import {ViewStyle} from "react-native"

export interface TopNavProps {
  pageTitle?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  back?: Function
}
