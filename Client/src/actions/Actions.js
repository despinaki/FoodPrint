export const logUser = userid => ({
    type: "LOG_USER",
    payload: userid
})
export const endSession = () => ({
    type: 'LOG_OUT'
})
export const saveToken = () => ({
    type: "SAVE_TOKEN",
    payload: token
})

