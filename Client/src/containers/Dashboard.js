import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import Logout from "../components/Logout" 
import Graph from "../components/Graph"

function Dashboard(props) {
    if(props.userid && props.token){
        return (
            <div>
                <Header />
                <h3>User: {props.userid}</h3>
                <Graph />
                <Logout/>
            </div>
        )
    } else {
        props.history.push('/')
        return(null)
    }
}

const mSTP = state => ({
    userid: state.userid,
    token: state.token
})

export default connect(mSTP)(Dashboard)