import React, { Component } from 'react'
import { connect } from 'react-redux';

class Calculator extends Component {
    state = {
        userid: this.props.userid,
        foodCategories:[],
        categoryChosen: "",
        foodsForCategory: []
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

    handleCategoryInput = e => {
        this.setState({categoryChosen: e.target.value})
    }
    
    render() {
        return (
            <div>
                <h1>User: {this.state.userid}</h1>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="category">Category</label><br/>
                    <input type="search" list="all-categories" name="category" onChange={this.handleCategoryInput} required></input><br/>
                    <datalist id="all-categories">
    {this.state.foodCategories.map((item,idx) => (<option key={idx}>{item.category}</option>))}
                    </datalist>
                <label htmlFor="food">Food</label><br/>
                    <input type="search" list="all-foods" name="food" required></input><br/>
                    <datalist id="all-foods">
    {this.state.foodsForCategory.map((item,idx) => (<option key={idx}>{item.foodname}</option>))}
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