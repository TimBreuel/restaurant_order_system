const passwordHash = require('password-hash')
const connect = require('../models/connectionFn')


// checkuser mongoose  for LOGIN form
function checkUser(email, password) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            Users.findOne({ email: email }).then(user => {
                if (user) {
                    if (passwordHash.verify(password, user.password)) {
                        resolve(user)
                    } else {
                        reject(3)
                    }
                } else {
                    reject(3)
                }
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })


}


module.exports = {checkUser}
