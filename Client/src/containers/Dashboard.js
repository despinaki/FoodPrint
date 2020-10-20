import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';

function Dashboard(props) {
    if(props.userid && props.token){
        return (
            <div>
               <Header />
               <p>accessed page!!!</p> 
               <h3>User: {props.userid}</h3>
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