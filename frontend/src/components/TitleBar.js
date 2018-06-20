import React from 'react';

import UserCard from './UserCard';

import nyanko from '../nyanko.png';

const TitleBar = ({ title }) => {
    return (
        <div className="c-title_bar">
            <h1> { title } </h1>
            <UserCard image={nyanko} />
        </div>
    )
}

export default TitleBar