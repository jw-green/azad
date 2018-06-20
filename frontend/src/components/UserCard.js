import React, { Component } from 'react';
import '../styles/UserCard.css';

import { connect } from 'react-redux';

class UserCard extends Component {
    render() {
        return (
            <div className="c-user_card__container">
                <div className="c-user_card">
                    <div className="c-user_card__info">
                        <p className="c-user_card__username">
                            {this.props.user_data.username}
                        </p>
                        <p className="c-user_card__level">
                            {this.props.user_data.id}
                        </p>
                    </div>
                    <div className="c-user_card__portrait">
                        <img className="c-user_card__portrait" alt="portrait" src={this.props.image}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user_data: state.auth.user,
    };
}

  const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)