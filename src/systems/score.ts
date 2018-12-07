
const addScore = (events, entities) => {
    const add = events.find(e => e.type === 'add-points');

    if(add){
        entities.scoreBoard.score += add.amount;
    }
};

const subScore = (events, entities) => {
    const subtract = events.find(e => e.type === 'subtract-points');
    if(subtract){
        entities.scoreBoard.score -= subtract.amount;
    }
};


export default (entities, { events }) => {
    addScore(events, entities);
    subScore(events, entities);
    return entities;
};