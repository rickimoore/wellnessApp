const swipeFinger = (entities, touches) => {

    touches.filter(t => t.type === "move").forEach(t => {
        let finger = entities.match;
        if (finger && finger.position) {
            finger.position = [
                finger.position[0] + t.delta.pageX,
                finger.position[1] + t.delta.pageY
            ];
        }
    });

    return entities;
};

const endSwipe = (entities, touches, dispatch) => {
    const finish = touches.find(t => t.type === "end");
    if (finish) {
        const xAxis = finish.event.pageX;
        const center = entities.canvas.center;

        if(xAxis < center) {
            dispatch({ type: "swipe-left" });
        }
        if(xAxis > center){
            dispatch({ type: "swipe-right" });
        }
    }
}


export default (entities, { touches, dispatch }) => {
    swipeFinger(entities, touches);
    endSwipe(entities, touches, dispatch);
    return entities;
};