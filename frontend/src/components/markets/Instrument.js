import React, {Component} from "react";

import "../../styles/markets/Instrument.css";

class Instrument extends Component {
    render()
    {
        return (
            <div className="c-instrument_container">
                <div className="c-instrument_img-placeholder"></div>
                <p className="c-instrument_name">{this.props.inst}</p>
                <div className="c-instrument_change"></div>
            </div>
        )
    }
}

export default Instrument