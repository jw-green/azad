// Replace __reducer__

const initialState = [
]

function __reducer__(state=initialState, action) {

    state = []

    switch (action.type) {
        case '__reducer__':
            return [...state, ...action.__reducer__];
        default:
            return state;
    }
}

export default __reducer__
