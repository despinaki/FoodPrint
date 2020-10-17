import React, { Component } from 'react';

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
    const userData ={
      username: this.state.user.username,
      email: this.state.user.email,
      password: this.state.user.password
    }

    const options = {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify(userData)
    }
    
    const URL = 'https://localhost:5000'

    fetch(`${URL}/auth/register`, options)
    .then(resp => resp.json())
    .then(resp => {
      if(resp.status === 201) {this.props.history.push('/login')}
    })
    .catch(err => alert('Invalid input'))
  }
    render() {
        return (
          <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">Username</label><br/>
                <input className="textbox" placeholder="username" type="text" name="username" onChange={this.handleInput} required></input><br/>
              <label htmlFor="email">Email</label><br/>
                <input className="textbox" placeholder="example@example.com" type="text" name="email" onChange={this.handleInput} required></input><br/>
              <label htmlFor="password">Password</label><br/>
                <input className="textbox" placeholder="password" type="password" name="password" onChange={this.handleInput} required></input><br/>
              <input type="submit" value="Register"></input>
            </form>
          </div>
        )
    }
}

export default Register
