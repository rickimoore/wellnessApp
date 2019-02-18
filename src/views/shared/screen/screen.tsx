import * as React from "react"
import { ScrollView, ViewStyle, SafeAreaView } from "react-native"
import { ScreenProps } from "./screen.props"
import { presets, isNonScrolling } from "./screen.presets"

/**
 * This screen does not scroll.
 *
 * @param props The screen props
 */
function ScreenWithoutScrolling(props: ScreenProps) {
    const preset = presets[props.preset] || presets["fixed"]
    const style = { ...preset.nonScroll, ...props.style }
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}

    return <SafeAreaView style={[style, backgroundStyle]}>{props.children}</SafeAreaView>
}

/**
 * This screen scrolls.
 *
 * @param props The screen props
 */
function ScreenWithScrolling(props: ScreenProps) {
    const preset = presets[props.preset] || presets["scroll"]
    const outerStyle = preset.scrollOuter
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
    const innerStyle = { ...preset.scrollInner, ...props.style } as ViewStyle

    return (
        <SafeAreaView style={[outerStyle, { backgroundColor: props.backgroundColor }]} >
            <ScrollView style={[outerStyle, backgroundStyle]} contentContainerStyle={innerStyle}>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
    if (isNonScrolling(props.preset)) {
        return <ScreenWithoutScrolling {...props} />
    } else {
        return <ScreenWithScrolling {...props} />
    }
}
