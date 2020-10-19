import React, { Component } from 'react'
import { connect } from 'react-redux';

class Calculator extends Component {
    state = {
        userid: this.props.userid,
        foodCategories:[],
        categoryChosen: "",
        foodsForCategory: [],
        foodChosen: "",
        quantityChosen: "",
        foodinfo: {}
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
    }

    handleSubmit = e => {
        e.preventDefault();
        const foodname = this.state.foodChosen;
        const URL = "http://localhost:5000"
        fetch(`${URL}/api/foods/${foodname}`)
        .then(resp => resp.json())
        .then(resp => this.setState({foodinfo: resp}))
        .catch(error => console.log(error))
    }
    
    render() {
        let paragraph;
        if (Object.keys(this.state.foodinfo).length > 0) {
            paragraph = <p>Has some staff</p>
        } else {
            paragraph = <p></p>
        }

        return (
            <div>
                <h1>User: {this.state.userid}</h1>
                <form id ="calcForm" onSubmit={this.handleSubmit}>
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
                        <select for="calcForm" name="quantity" onChange={this.handleInput} required>
                            <option value="0.5">Half serving</option>
                            <option value="1">One serving</option>
                            <option value="2">Two servings</option>
                        </select><br/>
                    <input type="submit" value="Submit"></input>
                </form>

                {paragraph}
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(Calculator)