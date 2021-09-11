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

	createdby : {
		type : String,
		default: ""
	},

	creator_id : {
		type : String,
		default : ""
	},

	upload:[{
		type: String,
	}],

	comment : [
		{

			comment: { type: String, required: true },
			createdby : {
				type : String,
				default: ""
			},
			date : {
				type : Date,
				default : Date.now
			},
		}
	]
});

module.exports = Post =  mongoose.model("Post", postSchema);
