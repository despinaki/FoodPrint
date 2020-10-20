import React from 'react'
import { connect } from 'react-redux';
import { endSession } from '../actions/Actions';

function Logout(props) {
    const signOut = () => {props.logOut()}
    return (
        <div>
          <button onClick={signOut}>Log out</button>  
        </div>
    )
}

const mSTP = state => ({
    userid: state.userid
})
const mDTP = dispatch => ({
    logOut: () => dispatch(endSession())
})

export default connect(mSTP, mDTP)(Logout);
