import React, { Component } from 'react';
import '../styles/SearchBar.css';

class SearchBar extends Component {

    componentDidMount() {
        console.log("SearchBar Mounted")
    }

    value() {
        console.log(this.state.search_value)
        return this.state.search_value;
    }

    onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    render() {
        return (
            <div className="c-search_container">
                <input 
                    ref="searchBar"
                    name="filter"
                    className="c-search_bar"
                    placeholder={this.props.default_value}
                    autoComplete="off"
                    onChange = {this.onFieldChange.bind(this)}
                />
            </div>
        )
    }
}

export default SearchBar;