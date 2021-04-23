import React from "react";
import DayPanel from '../DayPanel/DayPanel';
import Header from '../Header/Header';
import './DashboardHome.css';
import "react-datetime/css/react-datetime.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class DashboardHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            populated: false,
            plantsByDay: {
                "Sunday": [],
                "Monday": [],
                "Tuesday": [],
                "Wednesday": [],
                "Thursday": [],
                "Friday": [],
                "Saturday": [],
            },
        };
    }

    async componentDidMount() {
        
    }



    displayPlantsByDay() {
        let plantsByDay = this.props.plantsByDay;

        return (Object.entries(plantsByDay).map((entry, id) => {
            return (
                <Col xs className="day-col">
                    <DayPanel day={entry[0]} plants={entry[1]}></DayPanel>
                </Col>);
        }));
    }

    render() {
        if (this.props.loading) {
            return (<div>Loading...</div>);
        }

        if (!this.props.populated) {
            return (<div>No plants to water this week</div>);
        }

        return(
            <div>
                <Header></Header>
                <div>
                    <Container fluid>
                        <Row>
                            {this.displayPlantsByDay()}
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
