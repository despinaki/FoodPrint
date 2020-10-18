import React, { Component } from 'react'
import { connect } from 'react-redux';

class Calculator extends Component {
    state = {
        userid: this.props.userid,
        allTheFoods:[]
    }
    componentDidMount() {
        const getAllFoods = () => {
            const URL = "http://localhost:5000"
            fetch(`${URL}/api/foods/all`)
            .then(resp => resp.json())
            .then(resp => this.setState({allTheFoods: resp}))
            .catch(err=>console.log(err))
        }
        getAllFoods();
    }

    render() {
        return (
            <div>
                <h1>User: {this.state.userid}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="food">Food</label><br/>
                      <input type="search" list="all-foods" name="food" onChange={this.handleInput} required></input><br/>
                      <datalist id="all-foods">
        {this.state.allTheFoods.map((item,idx) => (<option key={idx}>{item.foodname}</option>))}
                      </datalist>
                </form>
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(Calculator)