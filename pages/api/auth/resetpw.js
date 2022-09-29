import { getSession } from "next-auth/react";
import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  const { email, password } = req.body;
  console.log("email", email);
  console.log("pw", password);
  if (!password) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();
  const toUpdateUser = await User.findOne({
    email: email,
  });
  console.log(toUpdateUser);
  toUpdateUser.password = password;
  await toUpdateUser.save();

  await db.disconnect();
  res.send({
    message: "User updated",
  });
}

export default handler;
