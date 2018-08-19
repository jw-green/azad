export const fetchBooks = () => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch("/api/books/", {headers, })
        .then(res => res.json())
        .then(books => {
          return dispatch({
            type: 'FETCH_BOOKS',
            books
          })
        })
    }
}

export const addBook = (title, author, genre) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    console.log(author)

    let body = JSON.stringify({ title, author, genre });
    return fetch("/api/books/", {headers, method: "POST", body})
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
          return dispatch({type: 'ADD_BOOK', books: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}