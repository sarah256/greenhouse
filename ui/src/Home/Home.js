import React, { Fragment } from "react";
import Plants from '../Plants/Plants';
import NewPlantPopUp from '../NewPlantPopUp/NewPlantPopUp';
import TodaysPlants from '../TodaysPlants/TodaysPlants';
import './Home.css';
import "react-datetime/css/react-datetime.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import logo from "./logo.jpg";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayPopup: false,
            reloadPlants: false,
            loading: true,
            plants: [],
            todaysPlants: [],
            plantsToWaterToday: false,
        };
    }

    async componentDidMount() {
        this.fetchPlantData();
    }

    async fetchPlantData() {
        const url = "http://127.0.0.1:4433/plants";

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin',url);

        const that = this;
        fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: headers
        }).then(function(response){
            return response.json()
        }).then(function(plants) {
            that.setState({
                loading: false,
                plants: plants,
            });
            that.filterTodaysPlants(plants);
        });
    }

    filterTodaysPlants(plants) {
        let todaysPlantsArr = [];
        // let plants = this.state.plants;
        let today = new Date();
        today.setDate(today.getDate());

        for(let i=0;i<plants.length;i++) {
            let plant = plants[i];
            let nextWater = new Date(plant.next_watering_date);
            nextWater.setDate(nextWater.getDate());
            console.log(plant.next_watering_date.slice(0,10));
            console.log(nextWater);
            // console.log(today.toISOString().slice(0,10));
            // if(plant.next_watering_date.slice(0,10) === today.toISOString().slice(0,10)) {
            //     todaysPlantsArr.push(plant);
            // }
            console.log(nextWater >= today);
            if(nextWater >= today) {
                todaysPlantsArr.push(plant);
            }
        }
        let waterToday;
        if(todaysPlantsArr.length>0 ) {
            waterToday = true;
        }else{
            waterToday = false;
        }
        this.setState({
            todaysPlants: todaysPlantsArr,
            plantsToWaterToday: waterToday,
        });
    }

    triggerNewPlantPopup() {
        this.setState({
            displayPopup: true,
        });
    }

    closeNewPlantPopup() {
        this.setState({
            displayPopup: false,
            reloadPlants: true,
        });
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        if (!this.state.plants || this.state.plants.length === 0) {
            return <div>No plants found</div>
        }
        let popup = null;
        let popupClass = "hide-element";
        let popupBackgroundClass = "";
        if(this.state.displayPopup) {
            popup = (<NewPlantPopUp closePopupHandler={() => this.closeNewPlantPopup()}></NewPlantPopUp>);
            popupClass = "popup";
            popupBackgroundClass = "popup-background";
        }
        let todaysPlants = null;
        if(this.state.plantsToWaterToday) {
            <div className="wrapper-todays-plants">
                <TodaysPlants plants={this.state.todaysPlants}/>
            </div>
        }
        return(
            <Fragment>
                <div className={popupBackgroundClass}></div>
                <div className="home-wrapper">
                    <div className="logo-div">
                        <img alt="" src={logo} className="logo"></img>
                        <h1 className="title">greenhouse</h1>
                    </div>
                    <div className="header-wrapper">
                    
                        <div className="page-title-wrapper">
                            <span className="span">
                                <h2 className="page-title">My plants</h2>
                                <h3>
                                    <span>
                                        <FontAwesomeIcon className="fa-icon" icon={faInfoCircle} />
                                        No plants to water today
                                    </span>
                                </h3>
                            </span>
                        </div>
                        <p className="info">
                            Select the <FontAwesomeIcon icon={faTint} /> button to indicate that the plant has been watered today
                        </p>
                        {todaysPlants}
                        
                        <div className="btn-div">
                            <button onClick={() => this.triggerNewPlantPopup()}>Add new plant</button>
                        </div>
                    </div>
                        
                    <div className={popupClass}>
                        {popup}
                    </div>
                    <div className="plant-table-wrapper">
                        <Plants reloadPlants={this.state.reloadPlants} plants={this.state.plants} loading={this.state.loading}/>
                    </div>
                </div>
            </Fragment>
        )
    }
}
