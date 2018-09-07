import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleBar from '../components/TitleBar';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="wrapper">
                <TitleBar title=""/>
            </div>
        )
    }
}

// ==================================================================================
// Redux Store Mappings
// ==================================================================================

const mapStateToProps = state => {
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);