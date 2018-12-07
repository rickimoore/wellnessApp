import Match from "../views/renderings/match"
import { createAttribute, compare } from "../utils";

const createMatch = (events, entities) => {
    const create = events.find(e => e.type === 'create-match');
    if(create) {
        entities.match = Match(
            "male",
            entities.avatar.attributes.length,
            [0,  entities.canvas.height - 300],
            createAttribute(entities.avatar.attributes.length)
        )
    }
};


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
        const match = compare(entities.avatar.attributes, entities.match.attributes);

        if(match) {
            dispatch({type: "add-time", amount: 3000});
            dispatch({type: "add-points", amount: entities.match.points});
        } else {
            dispatch({type: "subtract-time", amount: 2000})
        }
        delete entities.match;
        dispatch({ type: "create-match" });
    }

}


export default (entities, { events, dispatch }) => {
    matchLeft(events, entities, dispatch);
    matchRight(events, entities, dispatch);
    createMatch(events, entities, dispatch);
    return entities;
};