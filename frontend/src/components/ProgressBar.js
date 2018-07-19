import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ( { percent, bar_colour} ) => {
    var percentage = percent * 10 + "%"

    return (
        <div className="c-progress">
            <div className="c-progress_bar" style={{ width : percentage, backgroundColor: bar_colour }}>
                <div className="c-progress_text">
                    {percent}
                </div>
            </div>
        </div>
    )
}

export default ProgressBar