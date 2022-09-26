import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  var newOrder;
  await db.connect();
  // if (!session) {
  //   newOrder = new Order({
  //     ...req.body,
  //   });
  // } else {
  //   const { user } = session;
  //   newOrder = new Order({
  //     ...req.body,
  //     user: user._id
  //   });
  // }
  newOrder = new Order({
    ...req.body,
  });

  const order = await newOrder.save();
  await db.disconnect();
  res.status(201).send(order);
};
export default handler;
