import { ADD2, MINUS2 } from './action-types';
let initState = { number: 0 };
export default function (state = initState, action) {
    switch (action.type) {
        case ADD2:
            return { number: state.number + action.payload };
        case MINUS2:
            return { number: state.number - action.payload };
        default:
            return state;
    }
}