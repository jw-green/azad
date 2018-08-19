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