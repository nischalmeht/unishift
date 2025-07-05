const mongoose=require('mongoose');
require('dotenv').config();
 const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "ultraShip",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};
module.exports=connection;