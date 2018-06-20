export const fetchLifts = () => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch("/api/user_lifts/", {headers, })
        .then(res => res.json())
        .then(lifts => {
          console.log(lifts);
          return dispatch({
            type: 'FETCH_LIFTS',
            lifts
          })
        })
    }
  }