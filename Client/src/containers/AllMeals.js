import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './styles/AllMeals.css';

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
                <div id="grid-container">
                {allDates.map((date, idx) => {
                    return (
                        <div key={idx} className="grid-item">
                            <h3>Date: {date.slice(0,10)}</h3>
                            {this.state.allMeals.map((food, index) => {
                                return (
                                    <div key={index}>
                                        {Object.keys(food).map((key, idx) => {
                                        return (
                                            <div key={idx}>
                                                {food[key]===date ? <p>{food["foodname"]}: {food["quantity"]} serving(s) ({food["serving_weight"]*food["quantity"]} g)</p> : ""} 
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
                </div>
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(AllMeals)
