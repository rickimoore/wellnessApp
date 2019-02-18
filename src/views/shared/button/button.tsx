import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import {Icon} from "../icon"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
    // grab the props
    const { preset = "primary", tx, text, style: styleOverride, textStyle: textStyleOverride, children, iconPosition, icon, ...rest } = props

    // assemble the style
    const viewPresetToUse = viewPresets[preset] || viewPresets.primary
    const textPresetToUse = textPresets[preset] || textPresets.primary

    const viewStyle = { ...viewPresetToUse, ...styleOverride }
    const textStyle = { ...textPresetToUse, ...textStyleOverride }

    const content = children || <Text tx={tx} text={text} style={textStyle} />
    const preIcon = iconPosition === "pre" ? <Icon icon={icon} /> : null
    const postIcon = iconPosition === "post" ? <Icon icon={icon}/> : null


    if(preIcon) {
        return (
            <TouchableOpacity style={viewStyle} {...rest}>
                <Icon icon={icon}/>
                <Text tx={tx} text={text} style={textStyle} />
            </TouchableOpacity>
        )
    } else if (postIcon) {
        return (
            <TouchableOpacity style={viewStyle} {...rest}>
                <Text tx={tx} text={text} style={textStyle} />
                <Icon icon={icon}/>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={viewStyle} {...rest}>
                {content}
            </TouchableOpacity>
        )
    }
}
