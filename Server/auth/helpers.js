function validateUser(user) {
    const validEmail = typeof user.username == 'string' &&
                        user.username.trim() != '';
    const validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6;
  
    return validEmail && validPassword;
  }
  
  module.exports = { validateUser }