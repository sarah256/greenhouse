import React, { Fragment } from "react";
import Plants from '../Plants/Plants';
import NewPlantPopUp from '../NewPlantPopUp/NewPlantPopUp';
import TodaysPlants from '../../TodaysPlants/TodaysPlants';
import './PlantsHome.css';
import "react-datetime/css/react-datetime.css";
import Header from "../Header/Header";

export default class PlantsHome extends React.Component {
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
        if (this.props.loading) {
            return <div>Loading...</div>
        }
        let plants = (<div>No plants found</div>);
        if (this.props.sortedPlants && this.props.sortedPlants.length > 0) {
            plants = (
                <div className="plant-table-wrapper">
                    <Plants reloadPlants={this.state.reloadPlants} plants={this.props.sortedPlants} loading={this.props.loading}/>
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
        if(this.props.plantsToWaterToday) {
            todaysPlants = (<div className="wrapper-todays-plants">
                <TodaysPlants plants={this.props.todaysPlants}/>
            </div>);
            let len = this.props.todaysPlants.length;
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
