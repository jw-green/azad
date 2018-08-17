import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { books } from '../actions';

import '../styles/Lifts.css';
import '../styles/Books.css';
import UserCard from '../components/UserCard';

import nyanko from '../nyanko.png'

class Books extends Component {
    state = {
        title: "",
    }

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        document.body.style.backgroundColor = "white";
        return (
            <div className="wrapper">
                <div className="c-lift_title">
                    <h1>Books</h1>
                    <UserCard image={nyanko} />
                </div>
                <div className="c-lift__inner">
                    <div className="c-book_list">
                        {this.props.books.map(res => (
                            <Link to={{pathname: `/Books/${res.id}`, title: res.title, id: res.id}} key={`book_${res.id}`}>
                            <div className="c-book_cover">
                                <div className="c-book">
                                    <p>{res.title}, {res.author.last_name}</p>
                                    {/* <ProgressBar percent={res.sten_value} /> */}
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.books,
        user_data: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBooks: () => {
            dispatch(books.fetchBooks());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
