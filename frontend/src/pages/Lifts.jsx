import React, { Component } from 'react';

import { connect } from 'react-redux';
import { lifts } from '../actions';

import '../styles/Lifts.css';
import ProgressBar from '../components/ProgressBar';
import UserCard from '../components/UserCard';

import nyanko from '../nyanko.png'
import TitleBar from '../components/TitleBar';

class Lifts extends Component {
    state = {
        level: 0
    }

    componentDidMount() {
        this.props.fetchLifts();
    }

    calculateLevel() {
        this.sten_total = 0
        this.props.lifts.map( res => (
            this.sten_total += res.sten_value
        ))
        this.level = Math.round(this.sten_total/this.props.lifts.length)
        return(this.level.toString())
    }

    render() {
        document.body.style.backgroundColor = "white";
        return (
            <div className="wrapper">
                <TitleBar title="Lifts"/>
                <div className="c-lift__inner">
                    <div className="c-lift_list">
                        {this.props.lifts.map(res => (
                            <div key={`lift_${res.id}`} className="c-lift">
                                <p>{res.lift.lift.name}, {res.one_rep_max}</p>
                                <ProgressBar percent={res.sten_value} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

// ==================================================================================
// Redux Store Mappings
// ==================================================================================

const mapStateToProps = state => {
    return {
        lifts: state.lifts,
        user_data: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLifts: () => {
            dispatch(lifts.fetchLifts());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lifts)
