import React, { Fragment } from "react";
import Logo from '../Logo/Logo';
import './Nav.css';
import PlantsHome from '../../PlantsPage/PlantsHome/PlantsHome';
import DashboardHome from '../../Dashboard/DashboardHome/DashboardHome';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "",
            loading: true,
            plants: [],
            todaysPlants: [],
            sortedPlants: [],
            plantsToWaterToday: false,
            plantsByDay: {},
            weekPopulated: false,
        }
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
            that.sortPlantsByDay(plants);
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
        this.setState({
            todaysPlants: todaysPlantsArr,
            sortedPlants: sorted,
            plantsToWaterToday: waterToday,
        });
    }

    sortPlantsByDay(plants) {
        let populated = false;
        let result = {
            "Sunday": [],
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
        };

        let today = new Date();
        today.setDate(today.getDate());
        let todaysDay = today.getDay();

        let endOfWeek = new Date();
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        console.log("End of week: ", endOfWeek);
        for(let i=0;i<plants.length;i++) {
            let plant = plants[i];
            let nextWater = new Date(plant.next_watering_date);
            nextWater.setDate(nextWater.getDate());
            console.log("Next water: ", nextWater);
            console.log(nextWater <= endOfWeek);

            if(nextWater <= today || nextWater <= endOfWeek) {
                if(nextWater <= today) {
                    result[days[todaysDay]].push(plant);
                } else {
                    let nextWaterDay = nextWater.getDay();
                    result[days[nextWaterDay]].push(plant);
                }
                populated = true;
            }

        }
        console.log(result);

        this.setState({
            plantsByDay: result,
            weekPopulated: populated,
        });
    }

    render() {
        return (
            <div className="header-wrap">
                <Logo />
                <Router>
                    <div>
                        <nav>
                        <ul className="page-names">
                            <li className="page-name">
                                <Link className="link-title" to="/dashboard">Home</Link>
                            </li>
                            <li className="page-name">
                                <Link className="link-title" to="/plants">Plants</Link>
                            </li>
                            <li className="page-name">
                                <Link className="link-title" to="/calendar">Calendar</Link>
                            </li>
                        </ul>
                        </nav>

                        <Switch>
                            <Route path="/plants">
                                <PlantsHome loading={this.state.loading} todaysPlants={this.state.todaysPlants} sortedPlants={this.state.sortedPlants} plantsToWaterToday={this.state.plantsToWaterToday}/>
                            </Route>
                            <Route path="/calendar">
                                {/* <Home /> */}
                            </Route>
                            <Route path="/dashboard">
                                <DashboardHome loading={this.state.loading} plantsByDay={this.state.plantsByDay} populated={this.state.weekPopulated}/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
