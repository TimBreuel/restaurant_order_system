const nodemailer = require('nodemailer');
const sensitiveData = require('./sensitiveData')



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'restaurantordersystem8@gmail.com',
        pass: sensitiveData.password()
    }
});

//!take   msg name email subject
function sendEmail(email, subject, msg) {
    return new Promise((resolve, reject) => {
        var mailOptions = {
            from: 'restaurantordersystem8@gmail.com',
            to: email,
            subject: subject,
            text: msg
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log(info.response);
                resolve(info.response)
            }
        });

    })

}


module.exports = { sendEmail }