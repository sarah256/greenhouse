import React, { Fragment } from "react";
import Plants from '../Plants/Plants';
import NewPlantPopUp from '../NewPlantPopUp/NewPlantPopUp';
import TodaysPlants from '../TodaysPlants/TodaysPlants';
import './Home.css';
import "react-datetime/css/react-datetime.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import logo from "./logo.jpg";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayPopup: false,
            reloadPlants: false,
            loading: true,
            plants: [],
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
        });
        // this.props.reloadPlants = false;
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
        return(
            <Fragment><div className={popupBackgroundClass}></div>
                <div className="logo-div"><img alt="" src={logo} className="logo"></img><h1 className="title">greenhouse</h1></div>
                <div className="wrapper-todays-plants">
                    <TodaysPlants plants={this.state.plants}/>
                </div>

                <div className="wrapper-home">
                    <h2>My plants</h2>
                    <div className="btn-row"><div className="btn-div"><button onClick={() => this.triggerNewPlantPopup()}>Add new plant</button><p className="info">Select the <FontAwesomeIcon icon={faTint} /> button to indicate that the plant has been watered today</p></div>
                    <div className={popupClass}>
                        {popup}
                    </div></div>
                    <div><Plants reloadPlants={this.state.reloadPlants} plants={this.state.plants} loading={this.state.loading}/></div>
                </div>
            </Fragment>
        )
    }
}
