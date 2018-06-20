const initialState = [
]

function lifts(state=initialState, action) {

    state = []

    switch (action.type) {

        case 'FETCH_LIFTS':
            return [...state, ...action.lifts];

        default:
            return state;
    }
}

export default lifts