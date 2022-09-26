import nodemailer from 'nodemailer';

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EUSER, // email
        pass: process.env.EPASSWORD, //password
    },
  });
  let result = transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
};
// send email
const Mailer = ({ fullName, to }) => {
  const options = {
    from: 'support@shadowworklighting.com',
    to: to,
    subject: 'Message From SWL Store',
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
            <p>Thanks for your order, ${fullName}!</p>
      </div>
        `,
  };
Email(options)
};
export default Mailer