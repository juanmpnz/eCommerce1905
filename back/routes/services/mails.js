const nodemailer = require('nodemailer');

const postEmail=(user,cart,products)=> nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }
    console.log('Credentials obtained, sending message...');
    let transporter = nodemailer.createTransport({
        secure: false,
        service: "gmail",
        auth: {
            user: '1905ecommerce@gmail.com',
            pass: '1905eCommerce1905'
        },
        tls: {
            rejectUnauthorized: false
        } 
    });
    let message = {
        from: '<1905ecommerce@gmail.com>',
        to: `<${user.email}>`,
        subject: 'Nodemailer is unicode friendly ✔',
        text: `Hello ${user.name}! Your purchase has been made succesfully`,
        html:
        `<body style="background-color: #ff9e00;">
        <div style="margin: 0;
        padding: 0 0 20px 0;
        width: 100%;
        background-color: #002855;
        "> 
        <div style="border-collapse: collapse!important;
        background-color: #001233;
        color: white;
        font-family: Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI',Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 1.3;
        margin: 0;
        padding: 0;
        text-align: left;
        vertical-align: top;
        padding-bottom: 15%;
        ">
    <img style="clear: both;
    display: block;
    max-width: 100%;
    outline: 0;
    margin: 0 auto;
    text-decoration: none;
    <p style="
    font-family: Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI',Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;
    font-size: 30px;
    font-weight: 500;
    line-height: 1.3;
    margin: 34px 0 8px 0;
    padding: 0;
    text-align: center;
    color:white;"></p> <br>
   <p style="color: #888;
   font-size: 22px;
   line-height: 1.5;
   margin: 24px auto;
   margin-bottom: 30px;
   padding: 0;
   text-align: center;
   width: 90%;">Hello ${user.name}! Your purchase has been made succesfully: </p> 
    </div>
       <div style="
       color: #aaa;
       font-family: Arial,Helvetica,sans-serif;
       font-size: 1.6rem;
       font-weight: 400;
       line-height: 1.35;
       margin-bottom: 10px;
       padding-top: 20px;
       margin: 24px auto;
       text-align:center;"> 
       Total: <span>$${cart.total}</span><br></br>
       Thanks for your purchase!
       </div>
    </div>
    </body>`,
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        res.status(200).json(user)
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

module.exports =  postEmail