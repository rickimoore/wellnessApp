import React from "react";
import {View, StyleSheet, Image, Text} from "react-native";
import { attributes } from "../views/renderings/attributes";
import {color} from "../theme";
import {emotes} from "../views/renderings/emotes";

const attributeKeys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'
];

const calculateWidth = (canvasWidth) => {
    if(canvasWidth > 375){
        return 60
    } else {
        return 50
    }
}

export function  randomInt (min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function compare(arr1,arr2){

    if(!arr1  || !arr2) return false;

    const sArr1 = arr1.sort(), sArr2 = arr2.sort();

    for(var i = 0; i < sArr1.length; i++){
        if(sArr1[i] !== sArr2[i]){
            return false
        }
    }
    return true

}


export function  createAttribute (count) {
    let box = [];
    for(let i = 0; i < count; i++){
        box.push(attributeKeys[randomInt(0, attributeKeys.length - 1)])
    }
    return box
}

export function createMatchBox (target, level, buffer, bufferCount) {
    let bucket = Array.from(target);
    let matchBox = [];

    if(bufferCount >= buffer){
        return bucket
    }

    // fill bucket with possible attributes

    for(let i = 0; i < level; i++){
        bucket.push(attributeKeys[randomInt(0, attributeKeys.length - 1)])
    }

    // create match with higher probability

    for(let i = 0; i < target.length; i++){
        matchBox.push(bucket[randomInt(0, bucket.length - 1)])
    }

    return matchBox

}


export function displayPlayerAttributes(isClockRunning, attributeKeys, windowWidth){
    const gameAttributes = isClockRunning ? attributeKeys.length : 0;
    let emptySlots = Array.from({length: 5 - gameAttributes}, (v, k) => k+1);
    return (
        <View style={styles.landscape}>
            {
                isClockRunning ? attributeKeys.map((att, index) => (
                    <Image source={attributes[att]} key={index}
                           style={[styles.playerAttribute, {width: calculateWidth(windowWidth), height: calculateWidth(windowWidth)}]} resizeMode="contain"
                    />
                )) : null
            }
            {
                emptySlots.map((slot, index) =>(
                    <View key={index} style={[styles.emptySlot, {width: calculateWidth(windowWidth), height: calculateWidth(windowWidth)}]}/>
                ))
            }
        </View>
    )
}

export function displayAttributes (attributeKeys, windowWidth) {
    return (
        <View style={styles.tower}>
            {
                attributeKeys.map((att, index) => (
                  <Image source={attributes[att]} key={index}
                         style={[styles.attribute, {width: calculateWidth(windowWidth), height: calculateWidth(windowWidth)}]} resizeMode="contain"
                  />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    landscape: {flexDirection: "row", borderRadius: 25, padding: 10, alignItems: "center", justifyContent: "center"},
    tower: {flexDirection: "column", borderRadius: 25, padding: 10, backgroundColor: "white", borderColor: "white"},
    text: {color: "red", fontSize: 44, textAlign: "center"},
    attribute: {width: 60, height: 60, marginTop: 10},
    playerAttribute: {height: 50, marginRight: 10},
    emptySlot: {width: 50, height: 50, marginRight: 10, backgroundColor: color.palette.greenShade, borderRadius: 50},
    timeEmote: { position: "absolute", top: -5, right: -5, width: 25, height: 25 }
});

