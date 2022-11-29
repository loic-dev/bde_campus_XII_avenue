import {createTestAccount,createTransport,getTestMessageUrl} from 'nodemailer';


export const sendVerifyUserEmail = async (firstname,token) => {

    //test email
    let account = await createTestAccount();


    //create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: `Welcome ${firstname}`, // Subject line
        html: `<p>${token}</p>`, // html body
    });

    return getTestMessageUrl(info);
    
}