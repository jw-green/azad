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
        note_title: "",
        content: "",
        book_id: this.props.match.params.id,
    }

    resetForm = () => {
        this.setState({
            title: this.props.location.title,
            note_title: "",
            content: "",
            book_id: this.props.match.params.id,
        })
    }

    componentDidMount() {
        if (!this.state.book_id) {
            console.log("Failed to Mount: No Title");
        } else {
            this.props.fetchBookNotes(this.state.book_id);
        }
    }

    createNewNote() {
        return (
            <div className="wrapper">
                <div className="c-lift_title">
                    <h1>{`Create New Note for ` + this.state.title}</h1>
                    <UserCard image={nyanko} />
                </div>
                <div className="c-lift__inner">
                <form className="c-new_note_form" onSubmit={this.submitTask}>
                    <input
                        className="c-new_note_form-title"
                        onChange={(e) => this.setState({ note_title: e.target.value })}
                        placeholder="Title"/>
                    <textarea className="c-new_note_form-content"
                              onChange={(e) => this.setState({ content: e.target.value })}
                              placeholder="Notes"/>
                    <input type="submit" value="Submit"/>
                </form>
                </div>
            </div>
        )
    }

    submitTask = (e) => {
        e.preventDefault();
        if (this.state.content !== "") {
            this.props.addBookNote(this.state.note_title, this.state.content, this.state.book_id)
            window.location.reload();
        }
    }

    displayNote() {
        let book_note = this.props.book_notes.filter((note) =>
        note.book.title === this.state.title);

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
                                    <p>{res.title}</p>
                                    {/* <ProgressBar percent={res.sten_value} /> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    displayOrNew() {
        let book_note = this.props.book_notes.filter((note) =>
        // eslint-disable-next-line
        note.book.id == this.state.book_id);

        book_note.map(note => (
            this.state.title = note.book.title
        ));

        if (book_note.length > 0) {
            return this.displayNote();
        } else {
            return this.createNewNote();
        }
    }


    render() {
        document.body.style.backgroundColor = "white";
        return (
            this.displayOrNew()
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        book_notes: state.book_notes,
        user_data: state.auth.user,
        books: state.books,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBookNote: (note_title, content, book_id) => {
            return dispatch(book_notes.addBookNote(note_title, content, book_id));
        },
        fetchBookNotes: (book_id) => {
            dispatch(book_notes.fetchBookNotes(book_id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookNotes)
