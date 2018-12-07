
const startClock = (entities, time, dispatch) => {
    let clock = entities.clock;
    if(clock.time == null){
        clock.time = time.current;
        dispatch({ type: "create-match" });
    }
    return time;
};

const tickClock = (time, entities) => {
    let clock = entities.clock;
    if(clock.time){
        clock.timeDisplay = time.current - clock.time
    }
}

const checkIfClockReachLimit = (entities, time, dispatch) => {
    let clock = entities.clock;
    if(time.current - clock.time > clock.limit){
        dispatch({ type: "game-over" });
        clock.time = null
        clock.limit = 10000
    }
}

const addTime = (entities, events) => {
    let clock = entities.clock;
    const event = events.find(e => e.type === 'add-time');
    if(event){
        clock.limit += event.amount
    }
}

const subtractTime = (entities, events) => {
    let clock = entities.clock;
    const event = events.find(e => e.type === 'subtract-time');
    if(event){
        clock.limit -= event.amount
    }
}


export default (entities, { time, dispatch, events }) => {
    startClock(entities, time, dispatch);
    tickClock(time, entities);
    checkIfClockReachLimit(entities, time, dispatch);
    addTime(entities, events);
    subtractTime(entities, events);
    return entities;
};