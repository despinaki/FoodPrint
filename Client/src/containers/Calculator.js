import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from '../components/PieChart';
import Header from '../components/Header';
import AddFoodButton from '../components/AddFoodButton';
import './styles/Calculator.css'

class Calculator extends Component {
    state = {
        userid: this.props.userid,
        foodCategories:[],
        categoryChosen: "",
        foodsForCategory: [],
        foodChosen: "",
        quantityChosen: "",
        foodinfo: {},
        showResults: false, 
        showBreakdown: false
    }
    componentDidMount() {
        const URL = "http://localhost:5000"
        const findCategories = () => {
            fetch(`${URL}/api/foods/categories`)
            .then(resp => resp.json())
            .then(resp => this.setState({foodCategories: resp}))
            .catch(err=>console.log(err))
        }
        findCategories();
    }
    componentDidUpdate() {
        const URL = "http://localhost:5000"
        const findFoodsByCategory = () => {
            fetch(`${URL}/api/foods/categories/${this.state.categoryChosen}`)
            .then(resp=> resp.json())
            .then(resp => this.setState({foodsForCategory: resp}))
            .catch(err=>console.log(err))
        }
        findFoodsByCategory();
    }

    handleInput = e => {
        this.setState({[`${e.target.name}Chosen`]: e.target.value})
        this.setState({showResults: false})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({showResults: true})
        const foodname = this.state.foodChosen;
        const URL = "http://localhost:5000";
        fetch(`${URL}/api/foods/${foodname}`)
        .then(resp => resp.json())
        .then(resp => this.setState({foodinfo: resp}))
        .catch(error => console.log(error))
    }
    
    alterShow = () => {
        this.setState(prevState => ({
            showBreakdown: !prevState.showBreakdown
        }))
    }

    clearForm = () => {
        document.getElementById("calcForm").reset();
        this.setState({showResults: false});
        this.setState({showBreakdown: false});
    }
    
    render() {
        let resultsParagraph;
        let servingInfo;
        let resultsTranslation;
        
        if (Object.keys(this.state.foodinfo).length > 0 && this.state.showResults) {
            const result = (this.state.foodinfo.serving_weight/1000) * parseFloat(this.state.quantityChosen) * this.state.foodinfo.total_emissions;
            const resultWater = (this.state.foodinfo.serving_weight/1000) * parseFloat(this.state.quantityChosen) * this.state.foodinfo.total_water;
            const yearlyEq = (this.state.foodinfo.serving_weight/1000) * this.state.foodinfo.total_emissions * 52 * 2.5;
            const yearlyEqWater = (this.state.foodinfo.serving_weight/1000) * (this.state.foodinfo.total_water) * 52 * 2.5;

            servingInfo = <p>{`One serving corresponds to ${this.state.foodinfo.one_serving} (${this.state.foodinfo.serving_weight} g).`}</p>;
            resultsParagraph = <p><strong>Total CO2 emissions:</strong> {result.toFixed(2)} kg CO2-equivalents.<br/>
            <strong>Total fresh water withdrawals:</strong> {resultWater.toFixed(2)} L water.</p>
            resultsTranslation = <p>{`Consuming a serving of ${this.state.foodChosen.toLowerCase()} 2-3 times a week contributes to a yearly
             total of ${yearlyEq.toFixed(2)} kg CO2-equivalents in emissions and ${yearlyEqWater.toFixed(2)} L in fresh water withdrawals.`}<br/>
             {`This is the same as driving a regular petrol car for ${(yearlyEq * 4.13).toFixed(2)} km (${(yearlyEq * 2.57).toFixed(2)} miles),`}<br/>
             {`or heating an average UK home for ${(yearlyEq * 0.15).toFixed(2)} days.`}<br/>
             {`Also the same as taking ${(yearlyEqWater/88).toFixed(2)} eight-minute showers.`}</p>

        } else {
            servingInfo = <p></p>
            resultsParagraph = <p></p>
            resultsTranslation = <p></p>
        }

        return (
            <div>
                <Header />
                <div id="calc-container">
                <h2>See how the production of the foods you eat impacts the environment</h2>
                <form id="calcForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="category">Category</label><br/>
                        <input type="search" list="all-categories" name="category" onChange={this.handleInput} required></input><br/>
                        <datalist id="all-categories">
        {this.state.foodCategories.map((item,idx) => (<option key={idx}>{item.category}</option>))}
                        </datalist>
                    <label htmlFor="food">Food</label><br/>
                        <input type="search" list="all-foods" name="food" onChange={this.handleInput} required></input><br/>
                        <datalist id="all-foods">
        {this.state.foodsForCategory.map((item,idx) => (<option key={idx}>{item.foodname}</option>))}
                        </datalist>
                    <label htmlFor="quantity">Quantity</label><br/>
                        <select htmlFor="calcForm" name="quantity" onChange={this.handleInput} required>
                            <option defaultValue="" selected disabled >Select quantity</option>
                            <option value="0.5">Half serving</option>
                            <option value="1">One serving</option>
                            <option value="2">Two servings</option>
                        </select><br/>
                    <input type="submit" value="Submit" id="calc-submit"></input>
                </form>

                {servingInfo}
                {resultsParagraph}
                {resultsTranslation}
                {this.state.showResults && <p id="expansion" onClick={this.alterShow}>{this.state.showBreakdown ? 'Show less' : 'Show more'}</p>}
                { 
                    this.state.showBreakdown && this.state.showResults &&
                       <PieChart id="piechart" foodinfo={this.state.foodinfo} foodname={this.state.foodChosen} />
                }
                {
                    Object.keys(this.state.foodinfo).length > 0 && this.state.showResults &&
                    <AddFoodButton foodinfo={this.state.foodinfo} quantity={this.state.quantityChosen}/>
                }
                <br/>
                {
                    this.state.showResults &&
                    <button id="calc-another" onClick={this.clearForm}>Calculate another</button>
                }
                </div>
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(Calculator)