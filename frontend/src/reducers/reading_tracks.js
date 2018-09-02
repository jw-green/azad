const initialState = [
]

function reading_tracks(state=initialState, action) {

    state = []

    switch (action.type) {

        case 'FETCH_READING_TRACKS':
            return [...state, ...action.reading_tracks];

        default:
            console.log("hit")
            return state;
    }
}

export default reading_tracks