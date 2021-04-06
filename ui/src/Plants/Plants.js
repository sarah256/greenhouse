import React from "react";
import Plant from '../Plant/Plant';
import './Plants.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Plants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading,
            plants: this.props.plants,
        };
    }

    displayRow(plantRow) {
        return (
            <Row>
                {plantRow.map((plantObj, id) => {
                    return <Col xs xs="3" key={id} id="plantCol"><div id="plantCard"><Plant plant={plantObj}></Plant></div></Col>})}
             </Row> 
        )
    }

    displayRows() {
        let plants = this.state.plants;
        let result = [];
        for(let i=0;i<plants.length;i=i+4) {
            let plantRow = plants.slice(i, i+4);
            result.push(plantRow);
        }
        return (
            <div>
                {result.map((row, id) => {
                    return this.displayRow(row)})}
            </div>)
    }

    displayPlants() {
        return ( <Container fluid id="plantTable">
                {this.displayRows()}
        </Container> )
    }

    render() {
        return (
            <div>
                <div id="tableWrapper">{this.displayPlants()}</div>
            </div>
        )
    }
}
