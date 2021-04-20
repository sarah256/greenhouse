import React, { Fragment } from "react";
import Logo from '../Logo/Logo';
import './Nav.css';
import Home from '../Home/Home';
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
        }
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

                        {/* A <Switch> looks through its children <Route>s and
                            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/plants">
                                {/* <Home /> */}
                            </Route>
                            <Route path="/calendar">
                                {/* <Home /> */}
                            </Route>
                            <Route path="/dashboard">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                {/* <ul className="page-names">
                    <li className="page-name">
                        <a className="link-title" ref="/">HOME</a>
                    </li>
                    <li className="page-name">
                        <a className="link-title" href="/">PLANTS</a>
                    </li>
                    <li className="page-name">
                        <a className="link-title" href="/">CALENDAR</a>
                    </li>
                </ul> */}
                {/* <div className="page-names">
                    <span className="page-name">
                        HOME
                    </span>
                    <span className="page-name">
                        PLANTS
                    </span>
                    <span className="page-name">
                        CALENDAR
                    </span>
                </div> */}
            </div>
        )
    }
}
