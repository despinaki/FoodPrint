import React, { Component } from 'react'
import { connect } from 'react-redux';

class Graph extends Component {
    state = {
        sumData: []
    }

    componentDidMount() {
        const URL = "http://localhost:5000"
        fetch(`${URL}/api/${this.props.userid}/allemissions`)
        .then(resp => resp.json())
        .then(resp => this.setState({sumData: resp.sort((a, b) => a.date - b.date)}))
        .catch(err=>console.log(err))   
    }

    render() {
        const dates=[];
        if (this.state.sumData.length > 0) {
            this.state.sumData.map((obj, index) => {
                dates[index] = obj["date"]
            })
        } 
        return (
            <div>
               <p>{dates}</p> 
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(Graph)

