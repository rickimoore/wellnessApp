import Clock from "../views/renderings/clock";
import Player from "../views/renderings/player"
import ScoreBoard from "../views/renderings/score-board"
import Meter from "../views/renderings/timeMeter"
import {Dimensions} from "react-native";
import {createAttribute} from "../utils";

const getCenterLine = () => {
    const canvas  = Dimensions.get("screen");
    return canvas.width / 2;
};
const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;
const matchHeightPercentage = () => {
    if(windowHeight >= 736){
        return 55
    } else if ( windowHeight < 736 && windowHeight >= 568) {
        return 45
    } else {
        return 50
    }
};

const matchImageHeight = (windowHeight * matchHeightPercentage()) / 100;

const startY = windowHeight - matchImageHeight - 50

export default (level, score, time, preference) => {
    let display = 10000, limit = 10000;
    if(time){
        display = time + 5000;
        limit = time + 5000;
    }
    return {
        avatar: Player(false, preference, createAttribute(level), startY, windowWidth),
        clock: Clock(null, display, limit, windowWidth),
        scoreBoard: ScoreBoard(level, score, 0),
        timeMeter: Meter(level, 0, windowWidth, windowHeight),
        canvas: {
            center: getCenterLine(),
            height: windowHeight,
            width: windowWidth,
            matchRatio: matchHeightPercentage(),
        }
    }
}