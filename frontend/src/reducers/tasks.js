const initialState = [
    // {title: "Get Started!", state: "Incomplete"},
    // {title: "Try Not to Cum", state: "Incomplete"},
]

function tasks(state=initialState, action) {

    // state = []

    let taskList = state;

    switch (action.type) {

        case 'ADD_TASK':
            return [...state, action.task];

        case 'EDIT_TASK':
            let taskToUpdate = taskList[action.index]
            taskToUpdate.title = action.task.title;
            taskToUpdate.state = action.task.state;
            taskList.splice(action.index, 1, taskToUpdate);
            return [...taskList];

        case 'COMPLETE_TASK':
            let taskToComplete = taskList[action.index]
            taskToComplete.state = action.task.state;
            taskList.splice(action.index, 1, taskToComplete);
            return [...taskList];

        case 'DELETE_TASK':
            taskList.splice(action.id, 1);
            return [...taskList];

        case 'FETCH_TASKS':
            return [...state, ...action.tasks];

        default:
            return state;
    }
}

export default tasks
