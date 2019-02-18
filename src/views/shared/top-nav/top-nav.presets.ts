import {ViewStyle} from "react-native"
/**
 * All text will start off looking like this.
 */
const BASE: ViewStyle = {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 25,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * The default text styles.
   */
  primary: { ...BASE} as ViewStyle,

}

/**
 * A list of preset names.
 */
export type TopNavPresets = keyof typeof viewPresets
