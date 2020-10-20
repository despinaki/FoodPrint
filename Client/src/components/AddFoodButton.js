import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddFoodButton extends Component {
    state = {
        foodData: {
            userid: this.props.userid,
            foodid: this.props.foodinfo.foodid,
            quantity: this.props.quantity 
        }
    };

    postToMeal = (e) => {
        e.preventDefault()
        const Data = this.state.foodData;

        const options = {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.props.token}`},
            method: 'POST',
            body: JSON.stringify(Data)
        }

        const URL = 'http://localhost:5000'

        fetch(`${URL}/api/meals/today`, options)
        .then(resp => resp.json())
        .then(alert("Added to your meal"))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <button onClick={this.postToMeal}>Add to my meal</button>
            </div>
        )
    }
}


const mSTP = state => ({
    userid: state.userid,
    token: state.token
})

export default connect(mSTP)(AddFoodButton);
