import React, { Component } from 'react';
import Task from '../components/Task'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { tasks } from '../actions';

import '../styles/taskList.css';

import UserCard from '../components/UserCard';

// import cross from '../x.svg';
// import circle from '../circle.svg';

import nyanko from '../nyanko.png';

class TaskListView extends Component {
    state = {
        title: "",
        state: "",
        updateTaskId: null,
    }

    resetForm = () => {
        this.setState({
            title: "",
            state: "",
            updateTaskId: null,
        })
    }

    selectForEdit = (id) => {
        let task = this.props.tasks[id];
        this.setState({
            title: task.title,
            state: task.status,
            updateTaskId: id
        });
        this.nameInput.focus();
    }

    submitTask = (e) => {
        e.preventDefault();
        if (this.state.updateTaskId === null) {
            this.props.addTask(this.state.title, this.state.state).then(this.resetForm)
        } else {
            this.props.editTask(this.state.updateTaskId,
                this.state.title,
                this.state.state).then(this.resetForm);
        }

        this.setState({ title: "", state: "", updateTaskId: null });
    }

    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {
        document.body.style.backgroundColor = "white";
        return (
            <div className="wrapper">
                <div className="c-task_list__title">
                    <h1> Tasks </h1>
                    <UserCard image={nyanko} />
                </div>
                <div className="c-task_list__inner">
                    <div className="c-task_list">
                        {this.props.tasks.map((task, index) => (
                            <div className="c-task_detail" key={`task_${index}`}>
                                <Task title={task.title}
                                    status={task.state} />
                                <button onClick={() => this.props.deleteTask(index)}>Delete</button>
                                <button onClick={() => this.selectForEdit(index)}>Edit</button>
                                <button onClick={() => this.props.completeTask(index, task.title, task.state)}>Complete</button>
                            </div>
                        ))}
                    </div>
                    <div className="c-task_list__control">
                        <h3>Add New Task</h3>
                        <div className="c-task_list__control-search">
                            <form onSubmit={this.submitTask}>
                                <input
                                    ref={(input) => { this.nameInput = input; }}
                                    value={this.state.title}
                                    placeholder="Title"
                                    onChange={(e) => this.setState({ title: e.target.value, state: "Incomplete" })}
                                    required />
                            </form>
                            <input type="search" placeholder="Filter" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (title, state) => {
            return dispatch(tasks.addTask(title, state));
        },
        editTask: (id, title, state) => {
            return dispatch(tasks.editTask(id, title, state));
        },
        completeTask: (id, title, state) => {
            return dispatch(tasks.completeTask(id, title, state));
        },
        deleteTask: (id) => {
            return dispatch(tasks.deleteTask(id));
        },
        fetchTasks: () => {
            dispatch(tasks.fetchTasks());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskListView);