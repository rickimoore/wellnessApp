import React from "react";
import {StyleSheet, Text} from "react-native";
const attributes = [
    'x', 'o','p', 'y','w'
];

const  randomInt = (min,max) =>
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


export function compare(arr1,arr2){

    if(!arr1  || !arr2) return

    let result;

    arr1.forEach((e1,i)=>arr2.forEach(e2=>{

            if(e1.length > 1 && e2.length){
                result = compare(e1,e2);
            }else if(e1 !== e2 ){
                result = false
            }else{
                result = true
            }
        })
    )

    return result

}


export function  createAttribute (count) {
    let box = [];
    for(let i = 0; i < count; i++){
        box.push(attributes[randomInt(0, attributes.length - 1)])
    }
    return box
}

export function displayAttributes (attributes) {
    return (
        attributes.map((att, index) => (
            <Text key={index} style={styles.display}>
                {att}
            </Text>
        ))
    )
}

const styles = StyleSheet.create({
    display: {color: "white", fontSize: 44, textAlign: "center"}
});

