const nodemailer = require('nodemailer');



let transporter = nodemailer.createTransport({
                        host        :   'smtp.office365.com',
                        port        :    587,
                        secure      :    false,
                        auth        :   {
                            user: "oma sähköposti", //muuta
                            pass: "oma salasana" //muuta
                            },
                        tls         : {
                            rejectUnauthorized : false
                        },
                        requireTLS : true                   
                        },
                        {
                            from: "lähettäjä = oma sähköposti", //muuta
                            to: "vastaanottaja", //muuta
                            subject: "Yhteydenotto verkkosivulta",
                        })

module.exports = {
    'lahetaEmail' : (lomaketiedot, callback) => {

        let viesti = `
                ${lomaketiedot.nimi} </br>
                ${lomaketiedot.organisaatio} </br>
                ${lomaketiedot.email} </br>
                ${lomaketiedot.puh} </br> </br> </br>
                ${lomaketiedot.viesti}
                    `;


        var message = {
            text: viesti,
            html: viesti,
            replyTo: lomaketiedot.email,
            headers : {date: new Date()}
          };

        transporter.sendMail(message, (err) => {
            if (err) {
                console.log(err)
                callback('Viestiä ei saatu lähetettyä!')
            } else {
                callback('Viesti lähetetty onnistuneesti!')
            }
        });
         

    }
}