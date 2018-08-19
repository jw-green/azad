const initialState = [
]

function books(state=initialState, action) {

    state = []

    switch (action.type) {

        case 'FETCH_BOOKS':
            return [...state, ...action.books];

        case 'ADD_BOOK':
            return [...state, ...action.books];

        default:
            return state;
    }
}

export default books
