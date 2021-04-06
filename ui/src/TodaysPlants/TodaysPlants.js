import React, { Fragment } from "react";
import Plant from '../Plant/Plant';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TodaysPlants.css';

export default class TodaysPlants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: this.props.plants,
            todaysPlants: [],
            loading: true,
        };
    }

    async componentDidMount() {
        // console.log(this.state.plants);
        this.filterTodaysPlants();
        // console.log(this.state.plants);
    }

    filterTodaysPlants() {
        let todaysPlantsArr = [];
        let plants = this.state.plants;
        let today = new Date();
        today.setDate(today.getDate());

        // let waterBtn = this.state.wateredToday || lastWatered.getDate() === today.getDate() ? "water-btn-blue" : "water-btn";
        for(let i=0;i<plants.length;i++) {
            let plant = plants[i];
            let nextWater = new Date(plant.next_watering_date);
            nextWater.setDate(nextWater.getDate());
            console.log(plant.next_watering_date.slice(0,10));
            console.log(today.toISOString().slice(0,10));
            if(plant.next_watering_date.slice(0,10) === today.toISOString().slice(0,10)) {
                todaysPlantsArr.push(plant);
            }
        }
        this.setState({
            todaysPlants: todaysPlantsArr,
            loading: false,
        });
    }

    renderTodaysPlants(){
        let plantRow = this.state.todaysPlants;
        return (
            <Row>
                {plantRow.map((plantObj, id) => {
                    return <Col xs xs="3" key={id} id="plantCol"><div id="plantCard"><Plant plant={plantObj}></Plant></div></Col>})}
             </Row> 
        )
    }

    render() {
        if(this.state.loading) {
            return <div>Loading...</div>
        }
        console.log(this.state.todaysPlants);
        return (
            <div className="plants-div">
                <h2>Plants to water today</h2>
                {this.renderTodaysPlants()}
            </div>
        );
    }
}
