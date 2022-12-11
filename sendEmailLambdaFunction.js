var AWS = require("aws-sdk");

const EMAIL = process.env.EMAIL;
const REGION = process.env.REGION;
const SUBJECT = process.env.SUBJECT;

const responseHeaders = {"Access-Control-Allow-Origin": "*"};
const ses = new AWS.SES({region: REGION});
const toAddress = EMAIL;
const subject = SUBJECT;

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const data = `User Name : ${body.userName}\n`
    .concat(`Email : ${body.email}\n`)
    .concat(`Message : ${body.message}\n`);

    const params = {
        Destination: {ToAddresses: [toAddress]},
        Message: {Body: {Text: {Data: data}}, Subject: {Data: subject}},
        Source: toAddress
    };

let mailSendingError = false;
    await sendMail(params).then((data, error) => {
        if (error) {
            console.log("Error : ", error);
            mailSendingError = true;
        }
        console.log("data : ", data);
    }).catch(error => {
        console.log("Error : ", error);
        mailSendingError = true;
    });

    if (mailSendingError) {
        return {statusCode: 201, headers: responseHeaders, body: JSON.stringify({success: false})};
    } else {
        return {statusCode: 201, headers: responseHeaders, body: JSON.stringify({success: true})};
    }
};

const sendMail = async (params) => {
    return await new Promise((resolve, reject) => {
        ses.sendEmail(params, (error, data) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
};
