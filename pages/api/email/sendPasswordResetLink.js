import sendgrid from "@sendgrid/mail";
import jwt from "jsonwebtoken";

sendgrid.setApiKey(process.env.SENDGRID_KEY);

async function sendEmail(req, res) {
  try {
    //.BODY", req.body);
    const { email } = req.body;
    const secret = process.env.NEXT_PUBLIC_SECRET;
    console.log("secret", secret);
    const payload = { email: email };
    const token = jwt.sign(payload, secret, { expiresIn: "60m" });

    //const url = "https://www.shadow-work-lighting.com/reset-password/" + token;
    const url = "http://localhost:3000/reset-password/" + token;

    await sendgrid.send({
      to: ["palu83xoo@gmail.com"], //email,
      from: "shadow.work.lighting@gmail.com",
      subject: "Reset Your Password at SWL",
      dynamic_template_data: {
        url,
      },
      template_id: "d-681effdcf00b4647ac74bdfec9adef86",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
