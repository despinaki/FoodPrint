import React from 'react'
import { connect } from 'react-redux';
import { endSession } from '../actions/Actions';
import './styles/Logout.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Logout(props) {
    const signOut = () => {props.logOut()}
    return (
        <div id="section-logout">
          <button id="button-logout" onClick={signOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>  
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
