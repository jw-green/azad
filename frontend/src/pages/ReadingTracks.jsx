import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reading_tracks } from '../actions';
import TitleBar from '../components/TitleBar';
// import '../styles/reading_tracks.css';

import back from '../arrow-left.svg';

class ReadingTracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_track_title: "",
            selected_track_id: 0,
            selected_track_length: 0,
            add_new_track: false,
        }
    }

    componentDidMount() {
        this.props.fetchReadingTracks();
    }

    stateRender() {
        console.log(this.state.selected_track_id)
        if (this.state.selected_track_id !== 0) {
            return this.listTrackBooks()
        } else {
            return this.listReadingTracks()
        }
    }

    listReadingTracks() {
        console.log("Returning")
        return (
            <div className="wrapper">
                <TitleBar title="Reading Tracks"/>
                <div className="c-lift__inner">
                    <div className="c-book_list">
                        {this.props.tracks.map((track, index) => (
                            <div className="c-book_cover" 
                                key={index} 
                                onClick={(e) => this.setState({
                                                                selected_track_id: track.id, 
                                                                selected_track_title: track.title,
                                                                selected_track_length: track.track_length
                                                            })}
                            >
                                <div className="c-book">
                                    <p>{track.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    listTrackBooks() {
        let track = this.props.tracks.filter((track) =>
            this.state.selected_track_id === track.id
        )

        return (
            <div className="wrapper">
                <TitleBar title={`Reading Track: ` + this.state.selected_track_title}/>
                <div className="c-control_buttons">
                    <button className="c-note_action_button" onClick={(e) => this.setState({ selected_track_id: 0 })}>
                        <img src={back} className="backArrow" height="40px" alt="Go Back"/>
                    </button>
                    <p className="c-track_details">{this.state.selected_track_length} Books in Track</p>
                </div>
                <div className="c-lift__inner">
                    <div className="c-book_list">
                        {track.map((track) =>
                            track.books.map((book, index) => (
                            <div className="c-book_cover" key={index}>
                                <div className="c-book">
                                    <p>{book.title}</p>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.stateRender()
        )
    }
}

const mapStateToProps = state => {
    return {
        tracks: state.reading_tracks,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReadingTracks: () => {
            dispatch(reading_tracks.fetchReadingTracks());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingTracks);