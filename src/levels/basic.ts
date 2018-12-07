import Clock from "../views/renderings/clock";
import Avatar from "../views/renderings/player"
import ScoreBoard from "../views/renderings/score-board"
import {Dimensions} from "react-native";
import {createAttribute} from "../utils";

const getCenterLine = () => {
    const canvas  = Dimensions.get("screen");
    return canvas.width / 2;
};
const getHeight = () => {
    const canvas = Dimensions.get("screen");
    return canvas.height
}

export default (level, score) => {
    return {
        avatar: Avatar("male", createAttribute(level)),
        clock: Clock(null, 10000, 10000),
        scoreBoard: ScoreBoard(score),
        canvas: {center: getCenterLine(), height: getHeight()}
    }
}