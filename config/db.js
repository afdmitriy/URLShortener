const mongoose = require('mongoose');
const link = `mongodb+srv://user:qwe123123@cluster0.znoxz77.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = () => {
   return mongoose.connect(link);
};

module.exports = connectDB;
