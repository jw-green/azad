// --- React, Redux --- 
import React, { Component } from 'react';
import { connect } from 'react-redux';

// --- Components ---
import TitleBar from '../components/TitleBar';
import LineChart from '../components/LineChart';
import Instrument from '../components/markets/Instrument';

// --- Actions ---
import { markets } from '../actions';

// --- CSS --- 
import '../styles/MarketsPortfolio.css';


class MarketsPortfolio extends Component {

    state = {
        change: 0.0,
        changeOverTime: 0.0,
        color: "",
        color_up: "rgb(40, 167, 28)",
        color_down: "rgba(195, 60, 84, 1)",
        selected_instrument: "AAPL",
        time_range: "1y",
    }

    componentDidMount() {
        this.props.fetchData(this.state.selected_instrument, this.state.time_range);
    }

    createFakeData() {
        const data = []
        for (let x = 0; x <= 50; x++) {
            const random = Math.random();
            const temp = data.length > 0 ? data[data.length - 1].y : 50;
            // const y = random >= .6 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
            const y = random >= .7 ? temp - Math.floor(random * 20) : temp + Math.floor(random * 20);
            data.push({ x, y })
        }
        this.state.change = data[data.length-1].y - data[0].y;
        this.state.color = this.state.change > 0 ? this.state.color_up : this.state.color_down;
        return data;
    }

    processCloseData() {
        const data = []
        const {close} = this.props;
        if (close.length > 0) {
            for (let x = 0; x <= close.length; x++) {
                if (close[x]) {
                    var y = close[x].close;
                    data.push({ x, y });
                }
            }
            this.state.change = data[data.length-1].y - data[0].y;
            this.state.color = this.state.change > 0 ? this.state.color_up : this.state.color_down;
            var percentageChange = (close[close.length - 1].changeOverTime * 100)
            percentageChange = Math.round(percentageChange * 100) / 100
            this.state.changeOverTime = percentageChange + "%"
        } else {
            data.push({x: 1, y: 1})
            data.push({x: 1, y: 1})
        }
        return data;
    }

    modifyTimeRange(selected_time) {
        this.props.fetchData(this.state.selected_instrument, selected_time);
        this.setState({time_range: selected_time});
    }

    connectedOrNot() {
        if (this.props.close.length > 0){
            return (
                <div>
                    <LineChart data={this.processCloseData()} key={this.state.selected_instrument + this.state.time_range}/>
                    <div className = "c-time_selector">
                        <button className="btn" onClick={(e) => this.modifyTimeRange("1y")}>1y</button>
                        <button className="btn" onClick={(e) => this.modifyTimeRange("1m")}>1m</button>
                        <button className="btn" onClick={(e) => this.modifyTimeRange("1d")}>1d</button>
                    </div>
                    <div className="c-tile_title__container-symbol">
                                <p className="c-tile_title-symbol">{this.state.selected_instrument}</p>
                                <p style={{color: this.state.color}}> Change: {this.state.change} </p>
                                <p className="c-tile_title-change" style={{color: this.state.color}}>{this.state.changeOverTime}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <LineChart data={this.createFakeData()} />
                    <p> Fake Data </p>
                    <p style={{color: this.state.color}}> Change: {this.state.change} </p>
                </div>
            ) 
        }
    }

    fetchInstrument(instrument) {
        this.props.fetchData(instrument, this.state.time_range);
        this.setState({ selected_instrument: instrument });
    }

    render() {
        return (
            <div className="c-markets_wrapper">
                <TitleBar title="Markets Portfolio" />
                <div className="c-markets_inner">
                    <div className="c-markets_balance c-tile">
                        <div className="c-tile_title__container">
                            <p className="c-tile_title"> TOTAL BALANCE </p>
                        </div>
                        <p className="c-balance__figure"> $150,000.00 </p>
                        <div className="c-spinner">
                            <div className="c-inner_spinner">
                                +5.3%
                            </div>
                        </div>
                    </div>
                    <div className="c-markets_graph c-tile">
                        <div className="c-markets_graph__container">
                            {this.connectedOrNot()}
                        </div>
                    </div>
                    <div className="c-markets_portfolio c-tile">
                        <div className="c-tile_title__container">
                            <p className="c-tile_title"> PORTFOLIO </p>
                        </div>
                        <div className="c-portfolio_symbol__container">
                            {/* <Instrument inst="AAPL" onClick={(e) => this.fetchInstrument("AAPL")}/>
                            <Instrument inst="MSFT" onClick={(e) => this.fetchInstrument("MSFT")}/> */}
                            <p className="c-portfolio_symbol" onClick={(e) => this.fetchInstrument("AAPL")}>AAPL</p>
                            <p className="c-portfolio_symbol" onClick={(e) => this.fetchInstrument("MSFT")}>MSFT</p>
                            <p className="c-portfolio_symbol" onClick={(e) => this.fetchInstrument("AMZN")}>AMZN</p>
                            <p className="c-portfolio_symbol" onClick={(e) => this.fetchInstrument("NFLX")}>NFLX</p>
                        </div>
                    </div>
                    <div className="c-markets_activity c-tile">
                        <div className="c-tile_title__container">
                            <p className="c-tile_title"> TRADING ACTIVITY </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        close: state.markets,
        user_data: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (instrument, time_range) => {
            dispatch(markets.fetchData(instrument, time_range));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsPortfolio);