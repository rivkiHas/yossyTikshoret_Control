const twilio = require('twilio');
 const TWILIO_PHONE_NUMBER=
exports.handler = function(context, event, callback) {
    const client = new twilio(context.ACCOUNT_SID, context.AUTH_TOKEN);
    client.calls.create({
        to: event.to, // מספר היעד
        from: context.TWILIO_PHONE_NUMBER, // מספר Twilio שלך
        url: 'http://demo.twilio.com/docs/voice.xml' // קובץ XML המורה לפעולה במהלך החיוג
    }).then(call => {
        callback(null, call);
    }).catch(error => {
        callback(error);
    });
};
