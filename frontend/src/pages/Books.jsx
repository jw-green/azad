import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { books, authors } from '../actions';

import '../styles/Lifts.css';
import '../styles/Books.css';

import back from '../arrow-left.svg';
import add from '../plus.svg';
import SearchBar from '../components/SearchBar';
import TitleBar from '../components/TitleBar';

class Books extends Component {

// ==================================================================================
// Component Setup
// ==================================================================================

    state = {
        title: "",
        add_author: false,
        add_book: false,
        new_book_title: "",
        new_book_author: "",
        new_book_author_id: 0,
        new_book_genre: "",
        new_author_first: "",
        new_author_last: "",
        search_dropdown: false,
        filter: "",
        filter_type: "book"
    }

    componentDidMount() {
        console.log("Books Mounted");
        this.props.fetchBooks();
    }

    resetState() {
        this.setState( {
            title: "",
            add_author: false,
            add_book: false,
            new_book_title: "",
            new_book_author: "",
            new_book_author_id: 0,
            new_book_genre: "",
            new_author_first: "",
            new_author_last: "",
            search_dropdown: false,
            filter: "",
            filter_type: "book"
        });
    }

// ======================================================================================
// Render Display States
// ======================================================================================

    // ==================================================================================
    // listOrAdd()
    // - Switcher to control what is rendered.
    // 1. If 'Add Book' is selected, and 'Add Author' isn't, display a new book
    //    form for submission.
    // 2. If 'Add Book' is selected, and 'Add Author' is, also, display a new author
    //    form for submission.
    // 3. If neither are selected, or by default, list out all of the user's books
    // ==================================================================================

    listOrAdd() {
        if (this.state.add_book && !this.state.add_author) {
            return this.addBook();
        } else if (this.state.add_book && this.state.add_author) {
            return this.addAuthor();
        } else {
            return this.listBooks();
        }
    }

    // ==================================================================================
    // addBook()
    // - Allow the user to add a new book, suggesting a list of authors.
    // ==================================================================================

    addBook() {
        return (
            <div className="wrapper">
                <TitleBar title="Add a New Book"/>
                <div className="c-control_buttons">
                    <button className="c-note_action_button" onClick={(e) => this.setState({ add_book: false })}>
                        <img src={back} className="backArrow" height="40px" alt="Go Back"/>
                    </button>
                    <button className="c-note_action_button" onClick={(e) => this.setState({ add_author: true })}>
                        <img src={add} height="40px" alt="Add Author"/>
                    </button>
                </div>
                {/* { this.backButtonContext(book_note) } */}
                <div className="c-lift__inner">
                <form className="c-new_note_form" 
                      onSubmit={this.submitBook}
                      >
                    <input
                        className="c-new_book_field"
                        onChange={(e) => this.setState({ new_book_title: e.target.value })}
                        placeholder="Title"/>
                    <input
                        className="c-new_book_field"
                        onChange={(e) => this.searchBookAuthor(e.target.value)}
                        placeholder="Author"
                        autoComplete="off"
                        id="author"
                    />
                    {this.renderAuthorSearch()}
                    <input
                        className="c-new_book_field-bottom"
                        onChange={(e) => this.setState({ new_book_genre: e.target.value })}
                        placeholder="Genre"/>
                    <input type="submit" 
                           className="c-new_note_form-submit"
                           value="Submit"/>
                </form>
                </div>
            </div>
        )
    }

    // ==================================================================================
    // submitBook
    // - Submit book via API to backend
    // ==================================================================================


    submitBook = (e) => {
        e.preventDefault();
        if (
            this.state.new_book_title !== "" &&
            this.state.new_book_author_id !==0
           ) {
            this.props.addBook(
                               this.state.new_book_title, 
                               this.state.new_book_author_id, 
                               this.state.new_book_genre
                              )
        }
        this.resetState();
        window.location.reload();
    }

    // ==================================================================================
    // searchBookAuthor(search_string)
    // - Use a search string (longer than 3 characters) to query the backend
    //   for authors.
    // ==================================================================================


    searchBookAuthor(search_string) {
        if (search_string.length >= 3) {
            this.props.searchAuthors(search_string);
            this.setState({search_dropdown: true})
        } else {
            this.setState({search_dropdown: false})
        }
    }

    // ==================================================================================
    // renderAuthorSearch()
    // - Render the dropdown of selectable authors from search
    // ==================================================================================

    renderAuthorSearch() {
        if (this.state.search_dropdown) {
            return(
                <div className="c-authors_dropdown">
                    {
                        this.props.authors.map((author, index) => (
                                <p key={index} onClick={(e) => this.setAuthorInput(author.full_name, author.id)}>
                                    {author.full_name}
                                </p>
                        ))
                    }
                </div>
            )
        }
    }

    // ==================================================================================
    // setAuthorInput()
    // - Set the input field 'author' with the value of the selected name
    // ==================================================================================

    setAuthorInput(author_name, author_id) {
        console.log(author_id);
        document.getElementById("author").value=author_name;
        this.setState({search_dropdown: false, new_book_author_id: author_id});
    }

    // ==================================================================================
    // addAuthor()
    // - Allow the user to add a new author.
    // ==================================================================================

    addAuthor() {
        return (
            <div className="wrapper">
                <TitleBar title="Add a New Author"/>
                <div className="c-control_buttons">
                    <button className="c-note_action_button" onClick={(e) => this.setState({ add_author: false })}>
                        <img src={back} className="backArrow" height="40px" alt="Go Back"/>
                    </button>
                </div>
                <div className="c-lift__inner">
                <form className="c-new_note_form" onSubmit={this.submitAuthor}>
                    <input
                        className="c-new_note_form-title"
                        onChange={(e) => this.setState({ new_author_first: e.target.value })}
                        placeholder="First Name"/>
                    <input
                        className="c-new_note_form-title"
                        onChange={(e) => this.setState({ new_author_last: e.target.value })}
                        placeholder="Last Name"/>
                    <input type="submit" 
                           className="c-new_note_form-submit"
                           value="Submit"/>
                </form>
                </div>
            </div>
        )
    }

    // ==================================================================================
    // submitAuthor
    // - Submit book via API to backend
    // ==================================================================================


    submitAuthor = (e) => {
        e.preventDefault();
        if (
            this.state.new_author_first !== "" &&
            this.state.new_author_last !== ""
           ) {
            this.props.addAuthor(
                               this.state.new_author_first,
                               this.state.new_author_last
                              )
        }
        this.resetState();
        window.location.reload();
    }

    // ==================================================================================
    // onChange
    // - Handle change for child components
    // ==================================================================================

    onChange(field, value) {
        this.setState({[field]: value});
    }

    // ==================================================================================
    // listBooks()
    // - Default behaviour. Display a list of the user's books.
    // ==================================================================================

    listBooks() {
        let book_list = this.bookFilter()

        return (
            <div className="wrapper">
                <TitleBar title="Bookshelf"/>
                <div className="c-control_buttons">
                    <button className="c-note_action_button" onClick={(e) => this.setState({ add_book: true })}>
                        <img src={add} height="40px" alt="Add Book"/>
                    </button>
                    <select name="filter_type" onChange={(e) => this.setState({ filter_type: e.target.value })}>
                        <option value="book">Book</option>
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                    </select>
                    <SearchBar ref="book_searchBar" default_value="Filter Books" onChange={this.onChange.bind(this)}/>
                </div>
                <div className="c-lift__inner">
                    <div className="c-book_list">
                        {book_list.map(res => (
                            <Link to={{pathname: `/Books/${res.id}`, title: res.title, id: res.id}} key={`book_${res.id}`}>
                            <div className="c-book_cover">
                                <div className="c-book">
                                    <p>{res.title}, {res.author.last_name}</p>
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

bookFilter() {
    if (this.state.filter_type === "book") {
        return this.props.books.filter((book) =>
        book.title.toLowerCase().includes(this.state.filter.toLowerCase()));
    } else if (this.state.filter_type === "author") {
        return this.props.books.filter((book) =>
        book.author.full_name.toLowerCase().includes(this.state.filter.toLowerCase()));
    } else {
        return this.props.books.filter((book) =>
        book.genre.toLowerCase().includes(this.state.filter.toLowerCase()));
    }
}

// ==================================================================================
// Render Component
// ==================================================================================

    render() {
        document.body.style.backgroundColor = "white";
        return (
            this.listOrAdd()
        )
    }
}

// ==================================================================================
// Redux Store Mappings
// ==================================================================================

const mapStateToProps = state => {
    console.log(state)
    return {
        authors: state.authors,
        books: state.books,
        user_data: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBooks: () => {
            dispatch(books.fetchBooks());
        },
        addBook: (title, author, genre) => {
            dispatch(books.addBook(title, author, genre));
        },
        addAuthor: (first_name, last_name) => {
            dispatch(authors.addAuthor(first_name, last_name));
        },
        searchAuthors: (search_string) => {
            dispatch(authors.searchAuthors(search_string));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
