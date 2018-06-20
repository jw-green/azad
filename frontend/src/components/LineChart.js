import React, {Component} from "react";

import "../styles/LineChart.css";

class LineChart extends Component {
// GET MAX & MIN X
    getMinX() {
        const {data} = this.props;
        return data[0].x;
    }
    getMaxX() {
        const {data} = this.props;
        return data[data.length - 1].x;
    }

    // GET MAX & MIN Y
    getMinY() {
        const {data} = this.props;
        return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
    }
    getMaxY() {
        const {data} = this.props;
        return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
    }

    getSvgX(x) {
        const {svgWidth} = this.props;
        return (x / this.getMaxX() * svgWidth);
      }

    getSvgY(y) {
        const {svgHeight} = this.props;
        return svgHeight - (y / this.getMaxY() * svgHeight);
    }

    makePath() {
        const {data} = this.props;
        let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
        pathD += data.map((point, i) => {
            return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
        });
        return (<path className="linechart_path" d={pathD}/>);
    }

    makeArea() {
        const {data} = this.props;
        let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
        pathD += data.map((point, i) => {
            return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
        });

        pathD += "L " + this.getSvgX(this.getMaxX()) + " " + this.getSvgY(this.getMinY()) + " "
            + "L " + this.getSvgX(this.getMinX()) + " " + this.getSvgY(this.getMinY()) + " ";

        return <path className="linechart_area" d={pathD} />
    }

    makeAxis() {
        const minX = this.getMinX(), maxX = this.getMaxX();
        const minY = this.getMinY(), maxY = this.getMaxY();
      return (
          <g className="linechart_axis">
            <line
              x1={this.getSvgX(minX)} y1={this.getSvgY(minY-50)}
              x2={this.getSvgX(maxX)} y2={this.getSvgY(minY-50)} />
            <line
              x1={this.getSvgX(minX)} y1={this.getSvgY(minY-50)}
              x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
          </g>
        );
    }

    render() {
        const {svgHeight, svgWidth, data} = this.props;
        var {color} = this.props;
        color = data[0].y > data[data.length - 1].y ? this.props.color_down : this.props.color_up;
        return (
            <svg className="c-line" viewBox={`0 -40 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradient_fill" x2="0%" y2="100%">
                        <stop offset="5%" stopColor={color} stopOpacity="0.8"/>
                        <stop offset="95%" stopColor={color} stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="line_fade">
                        <stop offset="2%" stopColor={color} stopOpacity="0.4"/>
                        <stop offset="50%" stopColor={color} stopOpacity="1"/>
                        <stop offset="98%" stopColor={color} stopOpacity="0.4"/>
                    </linearGradient>
                </defs>
                {this.makeAxis()}
                {this.makePath()}
                {this.makeArea()}
            </svg>
        );
    }
}

LineChart.defaultProps = {
  data: [],
  color: '#eee',
  color_up: "rgb(40, 167, 28)",
  color_down: "rgba(195, 60, 84, 1)",
  svgHeight: 184,  
  svgWidth: 683
}

export default LineChart;