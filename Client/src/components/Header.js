import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './styles/Header.css'

export default class Header extends Component {
    render() {
        return (
            <div id="navbar">
                <ul className="navlist">
                    <li className="navtext" id="nav1">
                        <NavLink className="navlink" to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="navtext" id="nav2">
                        <NavLink className="navlink" to="/calculator">
                            Calculator
                        </NavLink>
                    </li>
                    <li className="navtext" id="nav3">
                        <NavLink className="navlink" to="/meals">
                            Meals
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
