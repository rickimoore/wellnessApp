const calculateSwipe = (position, center) => {
    return position < center ? "swipe-left" : "swipe-right"
}

const swipeFinger = (entities, touches) => {

    touches.filter(t => t.type === "move").forEach(t => {
        let match = entities.match;
        if (match && match.position) {
            match.position = [
                match.position[0] + t.delta.pageX,
                match.position[1] + t.delta.pageY
            ];
            match.status = calculateSwipe(t.event.pageX, entities.canvas.center)
        }
    });

    return entities;
};

const endSwipe = (entities, touches, dispatch) => {
    const finish = touches.find(t => t.type === "end");
    if (finish) {
        const swipe = calculateSwipe(finish.event.pageX, entities.canvas.center);
        dispatch({ type: swipe });
    }
}


export default (entities, { touches, dispatch }) => {
    swipeFinger(entities, touches);
    endSwipe(entities, touches, dispatch);
    return entities;
};