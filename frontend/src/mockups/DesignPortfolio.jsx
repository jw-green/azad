// --- React, Redux --- 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tasks } from '../actions';

// --- Components ---
import UserCard from '../components/UserCard';
import TitleBar from '../components/TitleBar';

// --- CSS --- 
import '../styles/DesignPortfolio.css';

// --- Images --- 
import nyanko from '../nyanko.png';


class DesignPortfolio extends Component {

    componentDidMount() {
        // this.props.fetchTasks();
    }

    render() {
        <div className="c-design_wrapper">
            <TitleBar title="Design Portfolio"/>
        </div>
    }

}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignPortfolio);