import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Welcome.css'

export default class Welcome extends Component {
    render() {
        return (
            <div id="welcome-wrap">
                <img src="../assets/foodprint.png" alt="logo"></img>
                <div id="welcome-text">
                    <p>Worried about climate change? Not sure how to take action? Start simple. What you eat matters!</p>
                    <p id="faded-text">-The food system contributes approximately 20–30% of global green house gases.-</p>
                    <p>Register now with FoodPrint, the online tool that helps you keep track of the environmental impact of your food choices.</p>
                    <NavLink to="/register"><button id="register-button" className="welcome-button">Register</button></NavLink>
                    <NavLink to="/login"><button id="login-button" className="welcome-button">Login</button></NavLink>
                </div>
            </div>
        )
    }
}

