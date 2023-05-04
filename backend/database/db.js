const { default: mongoose } = require("mongoose")

const connectDb = async () =>{
return await mongoose.connect('mongodb://127.0.0.1:27017/group_chat')
}

module.exports = connectDb