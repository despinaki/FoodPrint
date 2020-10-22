import React, { Component } from 'react';
import {logUser, saveToken} from '../actions/Actions';
import { connect } from 'react-redux';
import './styles/Login.css'

export class Login extends Component {
    state = {
        user: {}
    };


    handleInput = e => {
        let user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({user});
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            username: this.state.user.username,
            password: this.state.user.password
        }

        const options = {
            headers: { "Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(userData)
        }

        // const URL = 'http://localhost:5000'

        fetch(`/auth/login`, options)
        .then(resp => resp.json())
        .then(resp => {
            this.props.setUserId(resp.user_id)
            return resp})
        .then(resp => {
            this.props.getToken(resp.accessToken)
            return resp})
        .then(resp => {
            if(resp.user_id && resp.accessToken){
                this.props.history.push('/dashboard')
            }
        })
        .catch(err => alert('Invalid Login'))
    }

    render() {
        return (
            <div id="login-wrap">
              <img src="../assets/foodprint.png" alt="logo"></img>
              <form onSubmit={this.handleSubmit}>

                <label htmlFor="username" id="name">Username</label><br/>
                  <input  className="textbox1" id="nametext" type="text" name="username" onChange={this.handleInput}></input><br/>
                <label htmlFor="username" id="pass">Password</label><br/>
                  <input className="textbox1" id="passtext" type="password" name="password" onChange={this.handleInput}></input><br/>

                  <input type="submit" value="Log in" id="login"></input>
                </form>
            </div>
        )
    }
}

const mDTP = dispatch => ({
    setUserId: (userid) => dispatch(logUser(userid)),
    getToken: (token) => dispatch(saveToken(token))
})

export default connect(null, mDTP)(Login)
