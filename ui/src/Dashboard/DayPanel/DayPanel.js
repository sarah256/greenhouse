import React from "react";

export default class DayPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="day-content">
                {this.props.day}
            </div>
        )
    }
}