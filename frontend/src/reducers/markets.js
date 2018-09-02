const initialState = {
}

function markets(state=initialState, action) {

    state = []

    switch (action.type) {

        case 'FETCH_DATA':
            return [...state.markets, action.markets];

        default:
            return state;
    }
}

export default markets