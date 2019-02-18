import * as React from "react"
import { ImageBackground } from "react-native"
import { viewPresets } from "./imageCard.presets"
import { ImageCardProps } from "./imageCard.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function ImageCard(props: ImageCardProps) {
  // grab the props
  const { preset = "primary", style: styleOverride, children, image, borderStyle,imageUrl,...rest } = props

  // assemble the style
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary

  const viewStyle = { ...viewPresetToUse, ...styleOverride }

    const imageSrc = image ? image : {uri: imageUrl}


  return (
      <ImageBackground source={imageSrc} imageStyle={{ borderRadius: preset === "card" ? viewPresets.card.borderRadius : borderStyle ? borderStyle : 0 }} style={viewStyle} {...rest}>{children}</ImageBackground>
  )
}
