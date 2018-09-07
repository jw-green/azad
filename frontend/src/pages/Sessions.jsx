import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sessions } from '../actions';

import TitleBar from '../components/TitleBar';

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
        }
    }

    componentDidMount() {
        this.props.fetchSessions();
    }

    render() {
        console.log(this.props.sessions)
        return (
            <div className="wrapper">
                <TitleBar title="Sessions"/>
                {this.props.sessions.map( ( session, index ) => (
                    <div className="c-session" key={index}>
                        <p>{session.title}</p>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sessions: state.sessions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSessions: () => {
            return dispatch(sessions.fetchSessions());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);