const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')



dotenv.config()

//import Routes
const postRoute = require('./routes/api/post')
const userRoute = require('./routes/api/users')
const userAuth  = require('./routes/api/auth')
const conversationRoute = require('./routes/api/conversation')
const messageRoute = require('./routes/api/messages')

// app 
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

//Routes Middleware
app.use('/api/post' , postRoute)
app.use('/api/user' , userRoute)
app.use('/api/auth' , userAuth)
app.use('/api/conversation' , conversationRoute)
app.use('/api/messages' , messageRoute)


// Database
const db = process.env.MONGODB_URI
const port = process.env.PORT || 5000

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() =>
		app.listen(port, () => console.log(`Server running on port ${port} 🔥`))
	)
	.catch((error) => console.log(error.message));

mongoose.connection.once("open", () => {
	console.log("DB connected 🚀");
});

mongoose.set("useFindAndModify", false);





