export const fetchData = (instrument, time_range) => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      console.log(time_range)
      return fetch(`https://api.iextrading.com/1.0/stock/${instrument.toLowerCase()}/chart/${time_range}?filter=close,changeOverTime`, {headers, })
        .then(res => res.json())
        .then(markets => {
          return dispatch({
            type: 'FETCH_DATA',
            markets,
          });
        })
    }
}