const initialState = [
]

function skills(state=initialState, action) {

    state = []

    switch (action.type) {

        case 'FETCH_SKILLS':
            return [...state, ...action.skills];

        default:
            return state;
    }
}

export default skills