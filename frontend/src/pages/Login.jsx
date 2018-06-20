import React, { Component } from 'react';

import { connect } from 'react-redux';

import {auth} from "../actions"

import LoginCard from '../components/LoginCard';
import MessageCard from '../components/MessageCard';

import '../styles/App.css';

class Login extends Component {
    render() {
        document.body.style.backgroundColor = "#222";
        if (this.props.isAuthenticated) {
            return (
                <div className="wrapper">
                    <div className="c-message_card__container">
                        <MessageCard title="Welcome to Azad!"
                                    content={"Welcome back, " + this.props.user_data.username}
                                    link_yes="/Contents"
                                    link_no="/Lifts"/>
                    </div>
                    <button onClick={this.props.logout}/>
                </div>
            );
        }
        return (
            <div className="wrapper">
                <div className="c-message_card__container">
                    <LoginCard title="Welcome to Azad!"  
                                link_yes="/Tasks"
                                link_no="/Lifts"
                                showWarn={this.props.location.showWarn}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user_data: state.auth.user,
    };
}

  const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout())
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);