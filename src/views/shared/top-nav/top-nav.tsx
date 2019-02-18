import * as React from "react"
import {View, TouchableOpacity} from "react-native"
import { Text } from "../text";
import { TopNavProps } from "./top-nav.props"
import { Icon } from "../icon";
import {viewPresets} from "./top-nav.presets";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

function renderBack (backFunc) {
    if(backFunc){
        return (
            <TouchableOpacity onPress={() => backFunc()}><Icon icon={"back"}/></TouchableOpacity>
        )
    } else {
        return (
            <View style={{width: 5}}/>
        )
    }
}
export function TopNav(props: TopNavProps) {
  // grab the props
  const { pageTitle, back, style: styleOverride, ...rest } = props

    const viewPresetToUse = viewPresets.primary


    const viewStyle = { ...viewPresetToUse, ...styleOverride }


  return (
    <View {...rest} style={viewStyle}>
        {renderBack(back)}
          <Text>{pageTitle ? pageTitle : ""}</Text>
        <TouchableOpacity><Icon icon={"options"}/></TouchableOpacity>
    </View>
  )
}
