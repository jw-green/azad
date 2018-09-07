// --- React, Redux --- 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// --- Components ---
import TitleBar from '../components/TitleBar';

// --- CSS --- 
import '../styles/Contents.css';

class Contents extends Component {

    componentDidMount() {

    }

    render() {
        document.body.style.backgroundColor = "#fff";
        return (
            <div className="c-contents_wrapper">
            <TitleBar title="Contents"/>
                <div className="c-contents_inner">
                    <p><Link to="/Tasks">Tasks</Link></p>
                    <p><Link to="/Lifts">Lifts</Link></p>
                    <p><Link to="/Books">Books</Link></p>
                    <p><Link to="/Markets">Markets</Link></p>
                    <p><Link to="/Sessions">Sessions</Link></p>
                    <p><Link to="/ReadingTracks">Reading Tracks</Link></p>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Contents);