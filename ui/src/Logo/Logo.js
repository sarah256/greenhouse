import React from "react";
import './Logo.css';
import logo from './logo.jpg';

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "",
        }
    }

    render() {
        return (
            <div className="logo-div">
                <img alt="" src={logo} className="logo"></img>
                <h1 className="title">greenhouse</h1>
            </div>
        )
    }
}
