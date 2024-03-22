//import
const express = require('express');
const mailer = require('nodemailer');
const app = express();//tao sever
//tao transporter
let transporter=mailer.createTransport({
    service:'gmail',
    auth:{
        user:'anhntkph42900@fpt.edu.vn',
        pass:"ipao yiez hpln glha"
    }
});

let mailOption={
    from:'anhntkph42900@fpt.edu.vn',
    to:'kyanh2004.k2@gmail.com',
    subject:'test mail',
    text:'Day la mail test'
};
//gui mail
transporter.sendMail(mailOption,(error,info)=>{
    if(error){
        console.log(error);
    }else{
        console.log('thanh cong: '+info.messageId);
    }
});
//khoi dong server
app.listen(3004,()=>{
    console.log('server dang chay o cong 3004');
});