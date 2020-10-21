import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class AllMeals extends Component {
    state = {
        allMeals: []
    }

    componentDidMount() {
        const URL = "http://localhost:5000"
        fetch(`${URL}/api/${this.props.userid}/meals/all`)
        .then(resp => resp.json())
        .then(resp => this.setState({allMeals: resp}))
        .catch(err=>console.log(err))   
    }

    render() {
        const allDates = this.state.allMeals ? [...new Set(this.state.allMeals.map(meal => meal.date))] : []
        return (
            <div>
                <Header />
                {allDates.map((date, idx) => {
                    return (
                        <div key={idx}>
                            <h3>Date: {date}</h3>
                            {this.state.allMeals.map((food, index) => {
                                return (
                                    <div key={index}>
                                        {Object.keys(food).map((key, idx) => {
                                        return (
                                            <div key={idx}>
                                                {food[key]===date ? <p>{food["foodname"]}: {((food["serving_weight"]/1000) * food["quantity"] * food["total_emissions"]).toFixed(2)} kg CO2-equivalents</p> : ""} 
                                            </div>
                                        )
                                    })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                {/* serving_weight/1000 (kg)* quantity * total_emissions (CO2 eq per kg) */}
                {console.log(allDates)}
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(AllMeals)
