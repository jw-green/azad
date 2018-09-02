export const fetchReadingTracks = () => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch("/api/reading_tracks/", {headers, })
        .then(res => res.json())
        .then(reading_tracks => {
          return dispatch({
            type: 'FETCH_READING_TRACKS',
            reading_tracks,
          })
        })
    }
}