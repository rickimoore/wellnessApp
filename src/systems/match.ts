import Match from "../views/renderings/match"

const createMatch = (events, entities, dispatch) => {
    const create = events.find(e => e.type === 'create-match');
    if(create) {
        entities.match = Match("male", entities.game.level, [0,  entities.canvas.height - 100], [])
    }
}


const matchLeft = (events, entities, dispatch) => {
    const left = events.find(e => e.type === 'swipe-left');

    if(left){
        delete entities.match;
        dispatch({ type: "create-match" });
    }
};

const matchRight = (events, entities, dispatch) => {
    const right = events.find(e => e.type === 'swipe-right');

    if(right){
        delete entities.match;
        dispatch({type: "add-time", amount: 1000})
        dispatch({ type: "create-match" });
    }

}


export default (entities, { events, dispatch }) => {
    matchLeft(events, entities, dispatch);
    matchRight(events, entities, dispatch);
    createMatch(events, entities, dispatch);
    return entities;
};