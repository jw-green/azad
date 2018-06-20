import React from 'react';

import '../styles/task.css';


const Task = ({ title, status }) => {
    return (
        <div className="c-task__container">
            <div className="c-task__title">
                {title}
            </div>
            <div className="c-task__status">
                {status}
            </div>
        </div>
    )
}

export default Task