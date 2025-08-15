const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce')
    console.log('MongoDB Connected')
    } catch (error) {
     console.log(error)   
    }
}

module.exports = connectDB