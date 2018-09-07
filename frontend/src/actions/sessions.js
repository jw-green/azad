export const fetchSessions = () => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};

      let {token} = getState().auth;

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      return fetch("/api/sessions/", {headers, })
        .then(res => res.json())
        .then(sessions => {
          return dispatch({
            type: 'FETCH_SESSIONS',
            sessions
          })
        })
    }
}