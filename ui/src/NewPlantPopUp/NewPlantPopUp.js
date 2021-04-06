import React from "react";
// import Date from 'react-datetime';
import './NewPlantPopUp.css';

export default class NewPlantPopUp extends React.Component {
    constructor(props) {
        super(props);

        this.newPlantClickHandler = this.newPlantClickHandler.bind(this);

        this.state = {
            // plantId: null,
            // userId: null,
            plantName: null,
            plantDaysBtwnWatering: null,
            plantDetails: null,
            plantId: 9,
            // plantName: "Ivy",
            userId: 1,
            // plantDaysBtwnWatering: 5,
            // plantDetails: ""
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
        let dateTime = date + "T00:00:00.000000-00:00";
        json["last_watered_date"] = dateTime; // Need to append bc only DateTime objs are accepted ; EST timezone
        
        let daysBetweenWatering = parseInt(json["days_between_watering"]);
        let nextWateringDate = new Date(date);
        nextWateringDate.setDate(nextWateringDate.getDate() + daysBetweenWatering);
        
        json["next_watering_date"] = nextWateringDate;
        // console.log(nextWateringDate);
        // json["next_watering_date"] = json["last_watered_date"] + json["days_betweenn_watering"];
        console.log(JSON.stringify(json));

        const url = "http://127.0.0.1:4433/plant";

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin',url);
        headers.append('Access-Control-Allow-Origin','*');

        // let plantData = {
        //     id: this.state.plantId,
        //     plant_name: this.state.plantName,
        //     user_id: this.state.userId,
        //     days_between_watering: this.state.plantDaysBtwnWatering,
        //     details: this.state.plantDetails === "" ? ". . ." : this.state.plantDetails
        // };

        // console.log("here1");
        // console.log(json);
        // console.log(JSON.stringify(plantData));
        // console.log("here2");
        fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            // headers: headers,
            // body: JSON.stringify(plantData)
            body: JSON.stringify(json)});
        // }).then(function(response){
        //     return response.json()
        // });
        this.props.closePopupHandler();
    }

    render() {
        // this.setState({

        // });
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
                    {/* <input type="submit" value="Submit"></input> */}

                    <button className="submit-btn">Submit</button>
                </form>
                {/* <button className="submit-btn" onClick={()=>this.newPlantClickHandler()}>Add plant</button> */}
            </div>
        )
    }

}
