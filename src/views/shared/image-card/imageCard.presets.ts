import {ViewStyle, Dimensions} from "react-native"
import {color} from "../../../theme";


const screenWidth = Dimensions.get("screen").width,
    screenHeight = Dimensions.get("screen").height

const BASE_VIEW: ViewStyle = {
    width: screenWidth,
    height: screenHeight / 2,
    backgroundColor: color.palette.lighterGrey,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondary information.
   */
  primary: { ...BASE_VIEW } as ViewStyle,

  card: { ...BASE_VIEW, width: null, alignSelf: "stretch", borderRadius: 30, margin: 10} as ViewStyle,


  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

/**
 * A list of preset names.
 */
export type ImageCardPresetNames = keyof typeof viewPresets
