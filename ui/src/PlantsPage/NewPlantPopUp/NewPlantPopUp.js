import React from "react";
import './NewPlantPopUp.css';

export default class NewPlantPopUp extends React.Component {
    constructor(props) {
        super(props);

        this.newPlantClickHandler = this.newPlantClickHandler.bind(this);

        this.state = {
  
        }
    }

    newPlantClickHandler(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let json = {}
        data.forEach(function(value, prop){
            json[prop] = value
        });
        json["user_id"] = 123;
        let date = json["last_watered_date"];
        let dateTime = date + "T00:00:00.000000-04:00";
        json["last_watered_date"] = dateTime; // Need to append bc only DateTime objs are accepted ; EST timezone
        console.log("Last watered: ", json["last_watered_date"]);
        
        let daysBetweenWatering = parseInt(json["days_between_watering"]);
        let nextWateringDate = new Date(date);
        nextWateringDate.setDate(nextWateringDate.getDate() + daysBetweenWatering);
        
        json["next_watering_date"] = nextWateringDate;

        const url = "http://127.0.0.1:4433/plant";

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin',url);
        headers.append('Access-Control-Allow-Origin','*');

        fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify(json)});

            this.props.closePopupHandler();
    }

    render() {
        return(
            <div className="popup-body">
                <button className="close-btn" onClick={()=>this.props.closePopupHandler()}>X</button>
                <form onSubmit={this.newPlantClickHandler} className="plant-form">
                    <label htmlFor="plant_name">Plant name:</label><br />
                    <input type="text" id="plant_name" name="plant_name"></input><br />

                    <label htmlFor="days_between_watering">Days between watering:</label><br />
                    <input type="number" id="days_between_watering" name="days_between_watering"></input><br />

                    <label htmlFor="last_watered_date">Last time watered:</label><br />
                    <input type="date" id="last_watered_date" name="last_watered_date"></input><br />
                    
                    <label htmlFor="details">Details:</label><br />
                    <input type="text" id="details" name="details"></input><br />

                    <button className="submit-btn">Submit</button>
                </form>
            </div>
        )
    }

}
