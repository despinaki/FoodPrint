import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Logout"

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
                    <NavLink className="navlink" to="/allmeals">
                        Meals
                    </NavLink>
                </li>
                <li className="navtext">
                    <Logout/>
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
