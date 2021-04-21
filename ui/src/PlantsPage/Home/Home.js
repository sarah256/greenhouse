import React, { Fragment } from "react";
import Plants from '../Plants/Plants';
import NewPlantPopUp from '../NewPlantPopUp/NewPlantPopUp';
import TodaysPlants from '../../TodaysPlants/TodaysPlants';
import './Home.css';
import "react-datetime/css/react-datetime.css";
import Header from "../Header/Header";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayPopup: false,
            reloadPlants: false,
            loading: true,
            plants: [],
            todaysPlants: [],
            sortedPlants: [],
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
        let otherPlantsArr = [];
        let today = new Date();
        today.setDate(today.getDate());

        for(let i=0;i<plants.length;i++) {
            let plant = plants[i];
            let nextWater = new Date(plant.next_watering_date);
            nextWater.setDate(nextWater.getDate());
            if(nextWater <= today) {
                todaysPlantsArr.push(plant);
            } else {
                otherPlantsArr.push(plant);
            }
        }
        let waterToday;
        if(todaysPlantsArr.length>0 ) {
            waterToday = true;
        }else{
            waterToday = false;
        }
        let sorted = todaysPlantsArr.concat(otherPlantsArr);
        console.log(sorted);
        this.setState({
            todaysPlants: todaysPlantsArr,
            sortedPlants: sorted,
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
        let plants = (<div>No plants found</div>);
        if (this.state.sortedPlants && this.state.sortedPlants.length > 0) {
            plants = (
                <div className="plant-table-wrapper">
                    <Plants reloadPlants={this.state.reloadPlants} plants={this.state.sortedPlants} loading={this.state.loading}/>
                </div>);
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
        let todaysPlantsPrefix = "No plants";
        if(this.state.plantsToWaterToday) {
            todaysPlants = (<div className="wrapper-todays-plants">
                <TodaysPlants plants={this.state.todaysPlants}/>
            </div>);
            let len = this.state.todaysPlants.length;
            if(len === 1) {
                todaysPlantsPrefix = "1 plant";
            } else {
                todaysPlantsPrefix = len.toString() + " plants";
            }
        }
        return(
            <Fragment>
                <div className={popupBackgroundClass}></div>
                <Header todaysPlantsPrefix={todaysPlantsPrefix}/>        
                <div className={popupClass}>
                    {popup}
                </div>

                {plants}
            </Fragment>
        )
    }
}
