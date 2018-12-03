let startTime = null
let limit = 10000


const startClock = (time) => {
    if(startTime == null){
        startTime = time.current
    }
    return time;
};

const tickClock = (time, entities) => {
    if(startTime){
        entities.clock.display = time.current - startTime
        entities.clock.limit = limit
    }
}

const checkIfClockReachLimit = (time, dispatch) => {
    if(time.current - startTime > limit){
        dispatch({ type: "game-over" });
        startTime = null
    }
}


export default (entities, { time, dispatch }) => {
    startClock(time);
    tickClock(time, entities);
    checkIfClockReachLimit(time, dispatch);
    return entities;
};