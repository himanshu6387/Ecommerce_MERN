const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://abhiranjanms5646_db_user:3Dp80klUYZ1ErzTj@cluster1.pdqjeh9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
        // await mongoose.connect('mongodb://localhost:27017/ecommerce')
    console.log('MongoDB Connected')
    } catch (error) {
     console.log(error)   
    }
}

module.exports = connectDB