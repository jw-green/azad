import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { book_notes } from '../actions';

import '../styles/Lifts.css';
import '../styles/Books.css';
// import ProgressBar from '../components/ProgressBar';
import UserCard from '../components/UserCard';

import nyanko from '../nyanko.png';
import back from '../arrow-left.svg';
import add from '../plus.svg';

class BookNotes extends Component {

// ==================================================================================
// Component Setup
// ==================================================================================

    state = {
        title: this.props.location.title,
        note_title: "",
        view_note_id: "",
        content: "",
        add_note: false,
        book_id: this.props.match.params.id,
    }

    resetForm = () => {
        this.setState({
            title: this.props.location.title,
            note_title: "",
            view_note_id: "",
            content: "",
            add_note: false,
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

// ======================================================================================
// Render Display States
// ======================================================================================

    // ==================================================================================
    // displayOrNew()
    // - Switcher to control what is rendered.
    // 1. If the number of book notes returned for a specified book is
    //    longer than zero, there's no note selected, and we're not trying
    //    to add a new note, display a list of available notes.
    // 2. If the number of book notes returned for a specified book is
    //    longer than zero, there IS a note selected, and we're not trying
    //    to add a new note, display the content of the selected note.
    // 3. If there aren't any notes, or we're trying to add a new note,
    //    render a form to create a note.
    // ==================================================================================

    displayOrNew() {
        let book_note = this.props.book_notes.filter((note) =>
        // eslint-disable-next-line
        note.book.id == this.state.book_id);

        book_note.map(note => (
            this.state.title = note.book.title
        ));

        if (book_note.length > 0 && this.state.view_note_id==="" && this.state.add_note!==true) {
            return this.displayNote();
        } else if (book_note.length > 0 && this.state.view_note_id!=="" && this.state.add_note!==true) {
            return this.displayContent();
        } else {
            return this.createNewNote();
        }
    }

    // ==================================================================================
    // displayNote()
    // - Display notes for the selected book for the logged in user.
    // ==================================================================================

    displayNote() {
        let book_note = this.props.book_notes.filter((note) =>
        note.book.title === this.state.title);

        return (
            <div className="wrapper">
                <div className="c-lift_title">
                    <h1>{"Details: " + this.state.title}</h1>
                    <UserCard image={nyanko} />
                </div>
                <div className="c-control_buttons">
                    <Link to="/Books/">
                        <button className="c-note_action_button">
                            <img src={back} className="backArrow" height="40px"/>
                        </button>
                    </Link>
                    <button className="c-note_action_button" onClick={(e) => this.setState({ add_note: true })}>
                        <img src={add} height="40px"/>
                    </button>
                </div>
                <div className="c-lift__inner">
                    <div className="c-book_list">
                        
                        {book_note.map(res => (
                            <div className="c-book_cover" 
                                key={`book_${res.id}`}
                                onClick={(e) => this.setState({ view_note_id: res.id })}>
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

    // ==================================================================================
    // displayContent()
    // - Display the contents of a selected note for a selected book for
    //   logged in user.
    // ==================================================================================

    displayContent() {
        let book_note = this.props.book_notes.filter((note) =>
        note.id === this.state.view_note_id);

        return (
            <div className="wrapper">
                <div className="c-lift_title">
                    <h1>{"Details: " + this.state.title}</h1>
                    <UserCard image={nyanko} />
                </div>
                <button className="c-note_action_button" onClick={(e) => this.setState({ view_note_id: "" })}>
                    <img src={back} className="backArrow" height="40px"/>
                </button>
                <div className="c-note_wrapper">
                    <div className="c-new_note_form">
                        {book_note.map(res => (
                            <div className="" key={`book_${res.id}`}>
                                <div className="">
                                    <p className="c-note_title">{res.title}</p>
                                    {this.contentWithLinebreaks(res.content).map((line, index) => (
                                        <p className="c-note_content" key={index}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // ==================================================================================
    // createNewNote()
    // - Allow the user to create a new note for a selected book.
    // ==================================================================================

    createNewNote() {
        let book_note = this.props.book_notes.filter((note) =>
        note.book.title === this.state.title);

        return (
            <div className="wrapper">
                <div className="c-lift_title">
                    <h1>{`Create New Note for ` + this.state.title}</h1>
                    <UserCard image={nyanko} />
                </div>
                { this.backButtonContext(book_note) }
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

// ==================================================================================
// General Use Functions
// ==================================================================================

    contentWithLinebreaks(content) {
        var lines = content.split("\n");
        return lines;
    }

    backButtonContext(book_ref) {
        if (book_ref.length > 0) {
            return (
                <button className="c-note_action_button" onClick={(e) => this.setState({ add_note: false })}>
                    <img src={back} className="backArrow" height="40px"/>
                </button>
            )                  
        } else {
            return (
                <Link to="/Books/">
                    <button className="c-note_action_button">
                        <img src={back} className="backArrow" height="40px"/>
                    </button>
                </Link>
            )
        }
    }

// ==================================================================================
// Render Component
// ==================================================================================

    render() {
        document.body.style.backgroundColor = "white";
        return (
            this.displayOrNew()
        )
    }
}

// ==================================================================================
// Redux Store Mappings
// ==================================================================================

const mapStateToProps = state => {
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
