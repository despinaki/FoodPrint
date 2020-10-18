import React from 'react'
import { connect } from 'react-redux';
import { endSession } from '../actions/Actions';

function Dashboard(props) {
    const signOut = () => {props.logOut()}
    if(props.userid){
        return (
            <div>
               <p>accessed page!!!</p> 
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