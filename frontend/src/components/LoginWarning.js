import React from 'react';

import '../styles/LoginWarning.css'

const LoginWarning = ({content}) => {
    return (
        <div className="c-warning">
            <div className="c-warning_icon">
                !
            </div>
            <div className="c-warning_message">
                {content}
            </div>
        </div>
    )
}

export default LoginWarning