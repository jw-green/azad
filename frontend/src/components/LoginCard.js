import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

import { auth } from "../actions";

import '../styles/messageCard.css';
import LoginWarning from './LoginWarning';

import cross from '../x.svg';
import circle from '../circle.svg';

class LoginCard extends Component {
// const LoginCard = ({ title, link_yes, link_no }) => {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            console.log("Authenticated")
        }
        return (
            <div className="c-message_card__container">
                <div className="c-message_card">
                    <h1 className="c-message_card__header">
                        {this.props.title}
                    </h1>
                    <div className="c-message_card__inner">
                    {this.props.showWarn ? <LoginWarning content="Whoa there, Nelly. You have to log in first."/> : null}
                    <form className="c-login_form" onSubmit={this.onSubmit}>
                        <fieldset>
                            <legend>Login</legend>
                            <p>
                                <input
                                type="text" id="username"
                                placeholder="User Name"
                                onChange={e => this.setState({username: e.target.value})} />
                            </p>
                            <p>
                                <input
                                type="password" id="password"
                                placeholder="Password"
                                onChange={e => this.setState({password: e.target.value})} />
                            </p>
                            <p>
                                <button type="submit">Login</button>
                            </p>

                            <p>
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </fieldset>
                    </form>
                    </div>
                    <div className="c-message_card__control">
                        <Link to={this.props.link_yes}>
                            <div className="c-message_card__control-yes">
                                <img alt="yes" src={circle}/>
                            </div>
                        </Link>
                        <Link to={this.props.link_no}>
                            <div className="c-message_card__control-no">
                                <img alt="no" src={cross}/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
      errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
      });
    }
    return {
      errors,
      isAuthenticated: state.auth.isAuthenticated
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
      login: (username, password) => {
        return dispatch(auth.login(username, password));
      }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);