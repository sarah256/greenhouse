import React, { Fragment } from "react";
import Plant from '../Plant/Plant';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TodaysPlants.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default class TodaysPlants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: this.props.plants,
            todaysPlants: this.props.plants,
        };
    }

    async componentDidMount() {
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
        if(this.state.todaysPlants.length === 0){
            return (
                <div className="no-display"></div>
            )
        } else {
            return (
                <div className="plants-div">
                    <h2>Plants to water today</h2>
                    {this.renderTodaysPlants()}
                </div>
            );
        }
    }
}
