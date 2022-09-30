import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  try {
    const session = await getSession({ req });
    var newOrder;
    await db.connect();
    req.body.orderItems.map((item) => {
      item.image = item.image[0];
    });
    console.log("order", req.body);
    newOrder = new Order({
      ...req.body,
    });

    const order = await newOrder.save();
    await db.disconnect();
    res.status(201).send(order);
  } catch (err) {
    console.log("err", err);
  }
};
export default handler;
