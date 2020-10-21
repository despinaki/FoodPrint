import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class Header extends Component {
    render() {
        const headerLinks = (
            <ul className="navlist">
                <li className="navtext">
                    <NavLink className="navlink" to="/dashboard">
                        Dashboard
                    </NavLink>
                </li>
                <li className="navtext">
                    <NavLink className="navlink" to="/calculator">
                        Calculator
                    </NavLink>
                </li>
                <li className="navtext">
                    <NavLink className="navlink" to="/meals">
                        Meals
                    </NavLink>
                </li>
            </ul>
        );
        return (
            <div>
                {headerLinks}
            </div>
        )
    }
}
