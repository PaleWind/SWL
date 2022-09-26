import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("connected");
      return;
    }
    console.log("disconnecting");
    await mongoose.disconnect();
  }
  console.log("mongouri,", process.env.MONGODB_URI);
  const db = await mongoose.connect(process.env.MONGODB_URI);
  connection.isConnected = db.connections[0].readyState;
  console.log("connected?", connection.isConnected);
}

async function disconnect() {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = false;
  }
}
function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
