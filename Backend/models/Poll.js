const mongoose = require('mongoose')

const pollSchema = mongoose.Schema({
	poll_title: { type: String, required: true },

	poll_description: { type: String, required: true},

	active: { type:Boolean, required: true},

	submitted_by: { type: Array },

	not_submitted: { type: Array },

	total_vote: { type: Number },

	createdby : {
		type : String,
		default: ""
	},

	creator_id : {
		type : String,
		default : ""
	},

	option_list : [
		{
			option: { type: String, required: true },
            count: { type: Number, required: true}
		}
	]
},
{ timestamps: true }
);

module.exports = Poll =  mongoose.model("Poll", pollSchema);