import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <h1>FOODPRINT</h1>
                <p>welcome paragraph...</p>
                <NavLink to="/register"><button>Register</button></NavLink>
                <NavLink to="/login"><button>Login</button></NavLink>
            </div>
        )
    }
}

