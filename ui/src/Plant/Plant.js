import React, { Fragment } from "react";
import './Plant.css';
import plantImg from '../plant.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint } from '@fortawesome/free-solid-svg-icons'

export default class Plant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: {},
            wateredToday:false,
            // waterBtnClass: "water-btn";
        }
    }

    dateDisplayer(dateStr) {
        let date = new Date(dateStr.slice(0,10));
        return date.toDateString();
    }

    plantWateredToday() {
        this.setState({
            wateredToday: true,
        });

        const url = "http://127.0.0.1:4433/plant/" + this.props.plant._id;

        let plant = this.props.plant;
        let json = {}
        // plant.entries(function(value, prop){
        //     json[prop] = value
        // });

        for (const [key, value] of Object.entries(plant)) {
            json[key] = value;
        }
        let nextWateringDate = new Date();
        nextWateringDate.setDate(nextWateringDate.getDate() + parseInt(plant.days_between_watering));

        json.next_watering_date = nextWateringDate;

        let lastWateringDate = new Date();
        lastWateringDate.setDate(lastWateringDate.getDate());

        json.last_watered_date = lastWateringDate;

        delete json._id;

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin',url);

        fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            // headers: headers,
            body: JSON.stringify(json),
        });
    }

    render() {
        let today = new Date();
        today.setDate(today.getDate());
        let lastWatered = new Date(this.props.plant.last_watered_date);
        lastWatered.setDate(lastWatered.getDate());
        let waterBtn = this.state.wateredToday || lastWatered.getDate() === today.getDate() ? "water-btn-blue" : "water-btn";
        return (
            <Fragment>
                <div>
                    <img src={plantImg} id="plantImg" alt="plantImg"/>
                    <div className="btn-group">
                        <button id="wateredBtn" className={waterBtn} title="Mark as watered today" onClick={()=>this.plantWateredToday()}>
                            <FontAwesomeIcon icon={faTint} />
                        </button>
                        {/* <button id="expandBtn" className="expand-btn" title="See details">+</button> */}
                    </div>
                </div>
                <p className="plant-name">{this.props.plant.plant_name}</p>
                <p><div className="plant-detail-header">Next watering day: </div><div className="plant-detail">{this.dateDisplayer(this.props.plant.next_watering_date)}</div></p>
                <p><div className="plant-detail-header">Last watered: </div><div className="plant-detail">{this.dateDisplayer(this.props.plant.last_watered_date)}</div></p>
                {/* <p><div className="plant-detail-header">Days between watering: </div><div className="plant-detail">{this.props.plant.days_between_watering}</div></p> */}
                
            </Fragment>)
    }
}
//{"days_between_watering": 7, "details": "stuff", 
//"id": 1, "plant_name": "Ficus", "user_id": 123}]