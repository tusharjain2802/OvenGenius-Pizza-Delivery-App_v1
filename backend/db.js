const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.DB_URI 
module.exports = function (callback) {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    console.log("connected")
    const fetchedData = await mongoose.connection.db.collection("food_items");
    fetchedData.find({}).toArray(async function(err, data){
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function(err, catData){
            if (err) console.log(err);
            else{
                global.foodData = data;
                global.foodCategory = catData; 
            }
        })
    })
    })
};
