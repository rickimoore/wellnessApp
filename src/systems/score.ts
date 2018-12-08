
const addScore = (events, entities) => {
    const add = events.find(e => e.type === 'add-points');

    if(add){
        entities.scoreBoard.volley++;
        entities.scoreBoard.score += add.amount;
    }
};

const subScore = (events, entities) => {
    const subtract = events.find(e => e.type === 'subtract-points');
    if(subtract){
        entities.scoreBoard.score -= subtract.amount;
    }
};

const increaseLevel = (entities, dispatch) => {
    if(entities.scoreBoard.volley === 1 && entities.scoreBoard.level < 5) {
        dispatch({type: 'increase-level', time: entities.clock.timeDisplay})
    }
}


export default (entities, { events, dispatch }) => {
    addScore(events, entities);
    subScore(events, entities);
    increaseLevel(entities, dispatch);
    return entities;
};