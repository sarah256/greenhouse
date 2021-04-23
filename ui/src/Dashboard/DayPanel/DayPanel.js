import React from "react";
import "./DayPanel.css";

export default class DayPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    displaySmallPlants(plants) {
        return plants.map((plant, id) => {
            return (<p>{plant.plant_name}</p>);
        });
    }

    render() {
        console.log(this.props.plants);
        return (
            <div className="day-content">
                <div className="day-title">
                    {this.props.day}
                </div>
                <div className="day-body">
                    {/* {this.props.plants} */}
                    {this.displaySmallPlants(this.props.plants)}
                </div>
            </div>
        )
    }
}