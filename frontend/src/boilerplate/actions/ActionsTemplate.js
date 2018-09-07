// Replace __action__

export const fetch__action__ = () => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch("/api/__action__/", {headers, })
        .then(res => res.json())
        .then(__action__ => {
          return dispatch({
            type: '__action__',
            __action__
          })
        })
    }
}