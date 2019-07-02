const sgMail = require('@sendgrid/mail');


const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.send = async (para, assunto,html)=>{

   const msg = await {
        to: para,
        from: 'zuzucakes@yandex.com',
        subject: assunto,
        html: html,
      };
      sgMail.send(msg);
      
    
}




