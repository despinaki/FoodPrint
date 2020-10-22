import React, { Component } from 'react';
import './styles/Register.css'

export class Register extends Component {
  state = {
    user: {}
  }

  handleInput = e => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user})
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.user.password !== this.state.user.password2) {
        alert("Passwords must match!")
    } else {
        const userData = {
            username: this.state.user.username,
            email: this.state.user.email,
            password: this.state.user.password === this.state.user.password2 ? this.state.user.password : null
        }
        const options = {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(userData)
          }
          
          const URL = 'http://localhost:5000'
      
          fetch(`${URL}/auth/register`, options)
          .then(resp => resp.json())
          .then(resp => {
              if(resp.status === 201) {this.props.history.push('/login')}
          })
          .catch(err => alert('Invalid input'))
    }
  }
  
    render() {
        return (
          <div id="register-wrap">
            <img src="../assets/foodprint.png" alt="logo"></img>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username" id="user">Username</label><br/>
                <input className="textbox" id="usertext" placeholder="username" type="text" name="username" onChange={this.handleInput} required></input><br/>
              <label htmlFor="email" id="mail">Email</label><br/>
                <input className="textbox" id="mailtext" placeholder="example@example.com" type="text" name="email" onChange={this.handleInput} required></input><br/>
              <label htmlFor="password" id="pass1">Password</label><br/>
                <input className="textbox" id="pass1text" placeholder="password" type="password" name="password" onChange={this.handleInput} required></input><br/>
              <label htmlFor="password2" id="pass2">Confirm password</label><br/>
                <input className="textbox" id="pass2text" placeholder="passwords must match" type="password" name="password2" onChange={this.handleInput} required></input><br/>
              <input type="submit" id="register" value="Register"></input>
            </form>
          </div>
        )
    }
}

export default Register
