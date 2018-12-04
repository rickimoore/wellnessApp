let startTime = null
let limit = 10000


const startClock = (time, dispatch) => {
    if(startTime == null){
        startTime = time.current;
        dispatch({ type: "create-match" });
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

const addTime = (events, time, entities) => {
    const event = events.find(e => e.type === 'add-time');
    if(event){
        limit += 2000
    }
}


export default (entities, { time, dispatch, events }) => {
    startClock(time, dispatch);
    tickClock(time, entities);
    checkIfClockReachLimit(time, dispatch);
    addTime(events, time, entities);
    return entities;
};