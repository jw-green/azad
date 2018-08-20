export const searchAuthors = (search_string) => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch(`/api/authors/?search=${search_string}`, {headers, })
        .then(res => res.json())
        .then(authors => {
          return dispatch({
            type: 'SEARCH_AUTHORS',
            authors
          })
        })
    }
  }

  export const addAuthor = (first_name, last_name) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let {token} = getState().auth;
  
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }
    
      let body = JSON.stringify({ first_name, last_name });
      return fetch("/api/authors/", {headers, method: "POST", body})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 201) {
            return dispatch({type: 'ADD_AUTHOR', authors: res.data});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        })
    }
  }