import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/messageCard.css';

import cross from '../x.svg';
import circle from '../circle.svg';


const MessageCard = ({ title, content, link_yes, link_no }) => {
    return (
        <div className="c-message_card__container">
            <div className="c-message_card">
                <h1 className="c-message_card__header">
                    {title}
                </h1>
                <div className="c-message_card__inner">
                    {content}
                </div>
                <div className="c-message_card__control">
                    <Link to={link_yes}>
                        <div className="c-message_card__control-yes">
                            <img alt="yes" src={circle}/>
                        </div>
                    </Link>
                    <Link to={link_no}>
                        <div className="c-message_card__control-no">
                            <img alt="no" src={cross}/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MessageCard