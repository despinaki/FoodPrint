export const registerUser = userid => ({
    type: "REGISTER_USER",
    payload: userid
})
export const endSession = () => ({
    type: 'LOG_OUT'
  })
  