const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
    date : {
        type : Date,
        default : Date.now
    },
	admin: {
		type: Boolean,
		default: false,
	},

	comment : [
		{
			
		}
	]
});

module.exports = Post =  mongoose.model("Post", postSchema);
