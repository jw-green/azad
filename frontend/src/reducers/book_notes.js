const initialState = [
]

function book_notes(state=initialState, action) {

    state = []
    
    switch (action.type) {

        case 'ADD_BOOK_NOTE':
            return [...state, action.book_notes];

        case 'FETCH_BOOK_NOTES':
            return [...state, ...action.book_notes];

        default:
            return state;
    }
}

export default book_notes