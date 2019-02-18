import { ViewStyle, TextStyle } from "react-native"
import { color } from "../../../theme/color"
import { spacing } from "../../../theme/spacing"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[5],
  paddingHorizontal: spacing[5],
  borderRadius: 60,
  justifyContent: "center",
    flexDirection: "row",
  alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
    fontSize: 16,
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
  primary: { ...BASE_VIEW, backgroundColor: color.primaryDarker, borderColor: color.primaryDarker } as ViewStyle,
  
  /**
   * A button without extras.
   */

  white: { ...BASE_VIEW, backgroundColor: color.palette.white, borderColor: color.palette.offSalmon } as ViewStyle,

  dark: { ...BASE_VIEW, backgroundColor: color.palette.black,  borderColor: color.palette.black } as ViewStyle,

  clear: {...BASE_VIEW, backgroundColor: color.transparent, borderColor: color.palette.lighterGrey} as ViewStyle,


  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
    borderColor: color.transparent,
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, color: color.palette.white } as TextStyle,
    white: { ...BASE_TEXT, color: color.palette.black } as TextStyle,
    dark: { ...BASE_TEXT, color: color.palette.white } as TextStyle,
    clear: { ...BASE_TEXT, color: color.palette.lighterGrey } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
