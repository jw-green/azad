const initialState = [
]

function authors(state=initialState, action) {

    state = []
    
    switch (action.type) {

        case 'SEARCH_AUTHORS':
            return [...state, ...action.authors];

        default:
            return state;
    }
}

export default authors