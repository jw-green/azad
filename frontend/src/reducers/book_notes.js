const initialState = [
]

function book_notes(state=initialState, action) {

    switch (action.type) {

        case 'FETCH_BOOK_NOTES':
            return [...state, ...action.book_notes];

        default:
            return state;
    }
}

export default book_notes