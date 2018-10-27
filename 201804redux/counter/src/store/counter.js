import { ADD, MINUS } from './action-types';
let initState = { number: 0 };
export default function (state = initState, action) {
    switch (action.type) {
        case ADD:
            return { number: state.number + action.payload };
        case MINUS:
            return { number: state.number - action.payload };
        default:
            return state;
    }
}