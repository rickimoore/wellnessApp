import { ViewStyle, TextStyle } from "react-native"
import { color } from "../../../theme/color"
import { spacing } from "../../../theme/spacing"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.medium,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  fontSize: 18,
  paddingHorizontal: spacing.mediumLarge,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.orange } as ViewStyle,
  
  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: spacing.none,
    paddingVertical: spacing.none,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: 16, color: color.palette.white } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: spacing.none,
    paddingVertical: spacing.none,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
