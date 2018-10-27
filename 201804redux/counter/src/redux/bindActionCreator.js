export default function (actions, dispatch) {
    let newActions = {};
    for (let key in actions) {
        newActions[key] = (...args) => dispatch(actions[key](...args));
    }
    return newActions;
}