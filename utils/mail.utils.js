const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * 
 * @param {string} to The Reciever's Email ID
 * @param {string} from The Sender's Email ID
 * @param {string} subject Email Subject
 * @param {string} html Email Content in HTML
 */
function sendMail(to, from, subject, html) {
    return sgMail.send({
        to,
        from,
        subject,
        html
    });
}



module.exports.sendMail = sendMail;