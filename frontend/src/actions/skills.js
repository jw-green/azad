export const fetchSkills = () => {
    return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return fetch("/api/user_skills/", {headers, })
        .then(res => res.json())
        .then(skills => {
          console.log(skills);
          return dispatch({
            type: 'FETCH_SKILLS',
            skills
          })
        })
    }
  }