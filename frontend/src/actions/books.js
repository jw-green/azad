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