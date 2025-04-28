import nodemailer from 'nodemailer';

/**
 * 
 * @param {*} to para quem é enviado 
 * @param {*} name quem envia 
 * @param {*} body corpo do email
 * @param {*} subject assunto
 */
async function sendMail(to, name, body, subject) {
    const smtp = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'murilo.vidi@unochapeco.edu.br',
            pass: 'zdtk lfpp lyva lwyr'
        }
    });

    await smtp.sendMail({
        to,
        name,
        subject,
        html: body
    });
};

export default sendMail;