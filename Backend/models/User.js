const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type : String
    },
    email: {
       type: String,
       required: true
    },
    password: {
       type: String,
       required: true
    }
 },{
    timestamps: true,
    collection: 'users'
 }
)

module.exports = mongoose.model( 'User' , UserSchema);