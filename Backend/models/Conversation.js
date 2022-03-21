const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
	member:{
        type: Array,
    },
    
},
{ timestamps: true }
);

module.exports = Conversation =  mongoose.model("Conversation", conversationSchema);
