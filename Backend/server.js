const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
//const http = require('http');
var bodyParser = require('body-parser')

// const io = require('socket.io')(process.env.PORT_SOCKET || 5001,{
// 	cors:{
// 		origin: "*",
// 	}
// })




dotenv.config()

//import Routes
const postRoute = require('./routes/api/post')
const userRoute = require('./routes/api/user')
const userAuth  = require('./routes/api/auth')
const conversationRoute = require('./routes/api/conversation')
const messageRoute = require('./routes/api/messages')
const getUsersRoute = require('./routes/api/users');
const pollRoute = require('./routes/api/poll')

// app
// const app = express();
// const server = http.createServer(app);
// const io = require('socket.io')(server, {cors: {origin: '*'}});


const app = express();


// Middlewares
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ limit : '50mb' , extended : true}));
app.use(cors({
	origin : "*",
	methods : ["GET","POST","PUT","DELETE"],
}))

//Routes Middleware
app.use('/api/post' , postRoute)
app.use('/api/user' , userRoute)
app.use('/api/users', getUsersRoute)
app.use('/api/auth' , userAuth)
app.use('/api/conversation' , conversationRoute)
app.use('/api/messages' , messageRoute)
app.use('/api/poll' , pollRoute)


// Greeting Route
app.get( '/' , (req,res) => {
	res.send( " Hello to Info-Flow API ")
})


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
		// app.listen(port, () => console.log(`Server running on port ${port} 🔥`))
		console.log("server started")
	)
	.catch((error) => console.log(error.message));

mongoose.connection.once("open", () => {
	console.log("DB connected 🚀");
});

mongoose.set("useFindAndModify", false);



const server = require('http').createServer(app);
const io = require('socket.io')(server, {
		cors:{
			origin: "*",
		}
	});



let users = [];
let loggedInUsers = [];
let loggedInUsersSocketId = [];
let removedLoggedInUsers = [];
let removedLoggedInUsersSocketId = [];
let id_;
let title_;
let desc;
let options;
let submitted_by_;
let not_submitted_;
let total_vote_;



const addUser = ( userId, socketId) => {
	!users.some( user => user.userId === userId) &&
	users.push({userId, socketId});


}

const addLoggedInUser = ( userId, socketId) =>{

	if(!removedLoggedInUsers.includes(userId)&&!loggedInUsers.includes(userId) ){
		loggedInUsers.push(userId);
		loggedInUsersSocketId.push(socketId);
	}


	if( id_ && title_ && desc && options && submitted_by_){

		loggedInUsersSocketId.forEach( (id) =>{
			if(!removedLoggedInUsersSocketId.includes(id)){
				io.to(id).emit("sendpoll",{id_, title_, desc, options, submitted_by_, not_submitted_, total_vote_});
			}
		})

	}
}

const removeUser = ( socketId ) =>{
	users = users.filter( user => user.socketId !== socketId);
}

const removeLoggedInUser = ( userId, socketId) =>{
	if( !removedLoggedInUsers.includes(userId)){
		removedLoggedInUsers.push(userId);
		removedLoggedInUsersSocketId.push(socketId);
	}
}

const getUser = (userId) => {
	return users.find( user => user.userId === userId);
}


io.on( 'connection' , socket =>{

	//Connect
	console.log("connected", socket.id);

	//take userID and socketId
	socket.on("addUser" , userId =>{
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	})


	socket.on("addLoggedInUser" , userId =>{
		addLoggedInUser(userId, socket.id);
	})

	socket.on("reloaded-getUsers", () => {
		io.emit("getUsers", users);
	})

	//Send and get message
	socket.on("sendMessage", ({senderId, receiverId, text}) => {

		const user = getUser(receiverId);

		if(user){
			io.to(user.socketId).emit( "getMessage",{
				senderId,
				text
			})
		}

	})


	socket.on("getpoll", ({creator_id, id, title, description, optionList, submitted_by, not_submitted, total_vote}) =>{

		id_ = id
		title_ = title;
		desc = description;
		options = optionList;
		submitted_by_ = submitted_by
		not_submitted_ = not_submitted;
		total_vote_ = total_vote;

		io.emit("sendpoll",{creator_id, id, title, description, optionList, submitted_by, not_submitted, total_vote});


	})


	socket.on("updatedPoll", ({data}) =>{
		io.emit("recieveUpdatedPoll",{data});
	})

	socket.on("closePollForAll", () =>{
		io.emit("closePoll");
	})

	socket.on("refresh_conversation", () =>{
		io.emit("refresh_conv");
	})

	socket.on("logout", () =>{

	})

	//Disconnect
	socket.on("disconnect", () =>{
		removeUser( socket.id);
		removeLoggedInUser( socket.id);
		io.emit("getUsers", users);
		console.log("disconnected");
	})
})

server.listen(process.env.PORT || 5000, () =>{
	console.log(`SocketIO running on port ${process.env.PORT}`)
});