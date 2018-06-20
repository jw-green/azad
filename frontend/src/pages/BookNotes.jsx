import React, { Component } from 'react';

import { connect } from 'react-redux';
import { book_notes } from '../actions';

import '../styles/Lifts.css';
import '../styles/Books.css';
// import ProgressBar from '../components/ProgressBar';
import UserCard from '../components/UserCard';

import nyanko from '../nyanko.png'

class BookNotes extends Component {

    state = {
        title: this.props.location.title,
        id: this.props.location.id,
    }

    componentDidMount() {
        if (!this.state.title) {
            console.log("Failed to Mount: No Title");
        } else {
            // console.log(this.state)
            this.props.fetchBookNotes(this.state.id);
        }
    }


    render() {
        document.body.style.backgroundColor = "white";
        // console.log(this.props.book_notes)
        let book_note = this.props.book_notes.filter((note) =>
        note.book.title === this.state.title);
        console.log(book_note)
        return (
            <div className="wrapper">
                <div className="c-lift_title">
                    <h1>{"Details: " + this.state.title}</h1>
                    <UserCard image={nyanko} />
                </div>
                <div className="c-lift__inner">
                    <div className="c-book_notes">
                        {book_note.map(res => (
                            <div className="c-book_cover" key={`book_${res.id}`}>
                                <div className="c-book">
                                    <p>{res.content}</p>
                                    {/* <ProgressBar percent={res.sten_value} /> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        book_notes: state.book_notes,
        user_data: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookNotes: (id) => {
            dispatch(book_notes.fetchBookNotes(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookNotes)
