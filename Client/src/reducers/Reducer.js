const initialState = {
    userid: ''
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'REGISTER_USER':
            return {...state, userid: action.payload}
        case 'LOG_OUT':
            return {...state, userid: ''}
        case 'ADD_TOKEN':
            return {...state, accessToken: action.payload}
        default:
            return state;
    }
}

export default Reducer;
