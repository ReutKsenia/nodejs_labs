const sendmail = require("sendmail")({ silent: true });
const fromEmail = "rieut.ksenia@tut.by";
const toEmail = "rieut.ksenia@tut.by";

function send(message) {
    sendmail({
        from: fromEmail,
        to: toEmail,
        subject: 'SendMail',
        html: "<h2>" + message + "</h2>"
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    })
}
module.exports = send;
// module.exports = (message) => {
//     sendmail({
//         from: fromEmail,
//         to: toEmail,
//         subject: 'SendMail',
//         html: "<h2>" + message + "</h2>"
//     }, function (err, reply) {
//         console.log('send mail');
//         console.log(err && err.stack);
//         console.dir(reply);
//     })
// }