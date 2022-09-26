import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_KEY);

async function sendEmail(req, res) {
  try {
    console.log("REQ.BODY", req.body);
    const {
      orderID,
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    const { fullName, email, line1, city, postalCode, country } =
      shippingAddress;

    const url = "https://www.shadow-work-lighting.com/order/" + orderID;

    await sendgrid.send({
      to: "palu83xoo@gmail.com", //email,
      from: "shadow.work.lighting@gmail.com",
      subject: "Your Order From SWL",
      dynamic_template_data: {
        orderID,
        url,
        fullName,
        orderItems,
        email,
        line1,
        city,
        postalCode,
        country,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      },
      template_id: "d-72ce45a563bf46c8a95c79271e578442",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
