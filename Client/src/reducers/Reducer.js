const initialState = {
    userid: '',
    token: ''
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOG_USER':
            return {...state, userid: action.payload}
        case 'LOG_OUT':
            return {...state, userid: ''}
        case 'SAVE_TOKEN':
            return {...state, token: action.payload}
        default:
            return state;
    }
}

export default Reducer;
