// Replace __reducer__

const initialState = [
]

function sessions(state=initialState, action) {

    state = []

    switch (action.type) {
        case 'FETCH_SESSIONS':
            return [...state, ...action.sessions];
        default:
            return state;
    }
}

export default sessions
