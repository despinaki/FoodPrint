import React from 'react'
import { connect } from 'react-redux';
import { endSession } from '../actions/Actions';
import { NavLink } from 'react-router-dom';

function Dashboard(props) {
    const signOut = () => {props.logOut()}
    if(props.userid){
        return (
            <div>
               <p>accessed page!!!</p> 
               <h3>User: {props.userid}</h3>
               <NavLink to="/calculator">Calculator</NavLink><br/>
               <button onClick={signOut}>Log out</button>
            </div>
        )
    } else {
        props.history.push('/')
        return(null)
    }
}

const mSTP = state => ({
    userid: state.userid
})
const mDTP = dispatch => ({
    logOut: () => dispatch(endSession())
})

export default connect(mSTP,mDTP)(Dashboard)