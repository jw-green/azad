import React from 'react';
import '../styles/Skills.css';

const Skill = ({ name, skill_type, level, status, status_type }) => {
    return (
        <div className="c-skill_container">
            {/* If status is boolean, complete */}
            {/* If status is a number, show a bar*/}
            <div className="c-skill_headline">
                <h1 className="c-skill_name">
                    {name}
                </h1>
                <h3 className="c-skill_type">
                    {skill_type}
                </h3>
                <h3 className="c-skill_type">
                    {level}
                </h3>
            </div>

            <div className="c-skill_bar">
            </div>
        </div>
    )
}

export default Skill