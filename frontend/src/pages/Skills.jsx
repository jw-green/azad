import React, { Component } from 'react';

import { connect } from 'react-redux';
import { skills } from '../actions';

import '../styles/Skills.css';
import ProgressBar from '../components/ProgressBar';
import UserCard from '../components/UserCard';

import nyanko from '../nyanko.png'

class Skills extends Component {
    state = {
        level: 0
    }

    componentDidMount() {
        this.props.fetchSkills();
    }

    // calculateLevel() {
    //     this.sten_total = 0
    //     this.props.lifts.map( res => (
    //         this.sten_total += res.sten_value
    //     ))
    //     this.level = Math.round(this.sten_total/this.props.lifts.length)
    //     return(this.level.toString())
    // }

    render() {
        document.body.style.backgroundColor = "white";
        return (
            <div className="wrapper">
                <div className="c-skills_title">
                    <h1>Skills</h1>
                    <UserCard image={nyanko} />
                </div>
                <div className="c-skills__inner">
                    <div className="c-skills_list">
                        {this.props.skills.map(res => (
                            <div key={`skills_${res.skill.name}`} className="c-skills">
                                <p className="c-skills_label">{res.skill.name}</p>
                                <ProgressBar percent={res.skill_level} bar_colour="rgb(0, 129, 0)"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.skills)
    return {
        skills: state.skills,
        user_data: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSkills: () => {
            dispatch(skills.fetchSkills());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills)
