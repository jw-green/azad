// export const addTask = (title, state) => {
//     return dispatch => {
//         let headers = {"Content-Type": "application/json"};
//         let body = JSON.stringify({title, state, });
//         return fetch("/api/tasks/", {headers, method: "POST", body})
//           .then(res => res.json())
//           .then(task => {
//             return dispatch({
//               type: 'ADD_TASK',
//               task
//             })
//         })
//     }
// }

export const addTask = (title, state) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({title, state, });
    return fetch("/api/tasks/", {headers, method: "POST", body})
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
          return dispatch({type: 'ADD_TASK', task: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const editTask = (index, title, state) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({title, state, });
    let taskId = getState().tasks[index].id;

    return fetch(`/api/tasks/${taskId}/`, {headers, method: "PUT", body})
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
        if (res.status === 200) {
          return dispatch({type: 'EDIT_TASK', task: res.data, index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const completeTask = (index, title, state) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    if (state === "Incomplete") {
      state = "Complete";
    }

    let body = JSON.stringify({title, state, });
    console.log("Actions " + index)
    let taskId = getState().tasks[index].id;

    console.log("Action:" + state)

    return fetch(`/api/tasks/${taskId}/`, {headers, method: "PUT", body})
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
        if (res.status === 200) {
          return dispatch({type: 'COMPLETE_TASK', task: res.data, index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

// export const editTask = (index, title, state) => {
//     return (dispatch, getState) => {
//         let headers = {"Content-Type": "application/json", "Accept" : "application/json"};
//         let body = JSON.stringify({title, state, });
//         let task_id = getState().tasks[index].id
//         return fetch(`/api/tasks/${task_id}`, {headers, method: "PUT", withCredentials: true, body})
//           .then(res => res.json())
//           .then(task => {
//             return dispatch({
//               type: 'EDIT_TASK',
//               task,
//               index
//             })
//         })
//     }
// }

export const deleteTask = (id) => {
    return (dispatch, getState) => {

        let headers = {"Content-Type": "application/json"};
        let task_id = getState().tasks[id].id;
    
        return fetch(`/api/tasks/${task_id}/`, {headers, method: "DELETE"})
          .then(res => {
            if (res.ok) {
              console.log(res)
              return dispatch({
                type: 'DELETE_TASK',
                id
              })
            }
          })
      }
}

export const fetchTasks = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/tasks/", {headers, })
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
        if (res.status === 200) {
          return dispatch({type: 'FETCH_TASKS', tasks: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}