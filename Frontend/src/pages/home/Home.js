import React,{useEffect, useState, useRef} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Post from '../../components/post/Post_Card'
import SwitchBar from '../../components/switch/SwitchBar'
import {io} from 'socket.io-client'
import PollIcon from '@mui/icons-material/Poll';
import PollCreator from '../../components/poll_creator/PollCreator'
import Poll from '../../components/poll/Poll'
import './Home.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from './../../api/index';
import PollDialog from '../../components/poll_dialog/PollDialog'
import PollViewer from '../../components/poll_viewer/PollViewer'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {

	const [open, setOpen] = React.useState(false);
	const [ isLoggedIn , setIsLoggedIn ] = useState(false);
	const localStorageRef = useRef(localStorage.getItem("profile"));
	const [pollBoxOpen, setPollBoxOpen] = useState(false);
	const [pollDialogOpen, setPollDialogOpen] = useState(false);
	const [pollViewerOpen, setPollViewerOpen] = useState(false);
	const socket = useRef();
	const [pollAvailable, setPollAvailable] = useState(false);
	const [pollId, setPollId] = useState();
	const [pollTitle, setPollTitle] = useState();
	const [pollDesc, setPollDesc] = useState();
	const [optionList, setOptionList] = useState();
	const [pollSubmittedBy, setPollSubmittedBy] = useState();
	const [pollNotSubmittedBy, setPollNotSubmittedBy] = useState();
	const [pollTotalVote, setPollTotalVote] = useState();
	const [pollCreatorId, setPollCreatorId] = useState();
	const vertical = "bottom";
	const horizontal = "center";
	const userId = JSON.parse(localStorage.getItem('profile'))?.data.user.id;


	useEffect( () =>{
		socket.current = io("https://infofloww.herokuapp.com/");

		if( userId){
			axios.get('/api/poll')
			.then( res => {

				const data = res.data[res.data.length - 1];

				if( data.active && !data.submitted_by.includes(userId) && !data.not_submitted.includes(userId) ){
					console.log( data.submitted_by)
					setPollCreatorId(data.creator_id);
					setPollId(data._id);
					setPollTitle(data.poll_title);
					setPollDesc(data.poll_description);
					setOptionList(data.option_list);
					setPollSubmittedBy(data.submitted_by);
					setPollNotSubmittedBy(data.not_submitted);
					setPollTotalVote(data.total_vote);
					setPollAvailable(true);
					setPollBoxOpen(false);
				}
				console.log(data.submitted_by);
			})
			.catch( err => {
				console.log(err);
			})
		}
		
	},[])


	useEffect(() => {
		if(localStorage.getItem("profile")){
			setIsLoggedIn(true)
			//socket.current.emit("addLoggedInUser", JSON.parse(localStorage.getItem("profile")).data.user.id, socket.current.id)
			// socket.emit('pollbyadmin', [1,1,1,1]);
		}

			socket.current.on("sendpoll", ({creator_id, id, title, description, optionList, submitted_by, not_submitted, total_vote}) => {
			
				console.log( id, title, optionList, creator_id);
				setPollCreatorId(creator_id);
				setPollId(id);
				setPollTitle(title);
				setPollDesc(description);
				setOptionList(optionList);
				console.log(submitted_by)
				setPollSubmittedBy(submitted_by);
				setPollNotSubmittedBy(not_submitted);
				setPollTotalVote(total_vote)
				setPollAvailable(true);
				setPollBoxOpen(false);
			})

	})

	// isLoggedIn && socket.on('poll-recieved', arr =>{
	// 	console.log(arr);
	// })

	
	  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpen(false);
	  };

	const handlePollIconClick = () =>{
		//setPollBoxOpen(!pollBoxOpen);
		setPollDialogOpen(!pollDialogOpen);
	}

	const handleCreatePollIconClick = () => {
		setPollDialogOpen(!pollDialogOpen);
		setPollBoxOpen(!pollBoxOpen);
	}

	const handlePollViewerIconClick = () =>{
		setPollDialogOpen(!pollDialogOpen);
		setPollViewerOpen(!pollViewerOpen);
	}

	const handleBackCreatePoll = () =>{
		setPollDialogOpen(true);
		setPollBoxOpen(false);
	}

	const handleBackPollViewer = () =>{
		setPollDialogOpen(true);
		setPollViewerOpen(false);
	}

	const handleClosePollDialog = () =>{
		setPollDialogOpen(false);
	}


	const handleCloseCreatePoll = () =>{
		setPollBoxOpen(false);
	}

	const handleClosePollViewer = () =>{
		setPollViewerOpen(false);
	}

	const handlePollCloseIconClick = () =>{
		setPollAvailable(!pollAvailable);
		if(pollAvailable){
			setOpen(true);
		}
	}

	const handlePollCloseByUser = (id, userId) =>{

		try{
			console.log(userId)
			const res = axios.post('/api/poll/add-user-not-submitted', {id: id, userId: userId});
			res.then( (response) => console.log(response.data),
			(err) => console.log(err)
			)
			}
			catch(err){
			console.log(err);
		}
		setPollAvailable(!pollAvailable);
	}
	
    return (
        <div className="home">
			{/* header */}
			<div className="home__header">
				<Navbar />
			</div>
			{/* switch bar */}
			{isLoggedIn && 
				<div className="home__switch__bar">
					<SwitchBar />
				</div>
			}
			
			{/* main */}
			<div className="home__main">
				<Post />
            </div>

			{localStorage.getItem("profile") && JSON.parse(localStorageRef.current).data.user.admin && 
				<PollIcon className='poll__icon' fontSize='large' onClick={handlePollIconClick} />
			}
			{ pollBoxOpen &&
			<div className='poll__creator__div'>
				<PollCreator handlePollIconClick={handlePollIconClick} handleCloseCreatePoll={handleCloseCreatePoll} handleBackCreatePoll={handleBackCreatePoll}/>
			</div>
			}

			{ pollDialogOpen &&
			<div className='poll__dialog__div'>
				<PollDialog handlePollIconClick={handlePollIconClick} handleCreatePollIconClick={handleCreatePollIconClick}  handlePollViewerIconClick={handlePollViewerIconClick} handleClosePollDialog={handleClosePollDialog} />
			</div>
			}

			{ pollViewerOpen &&
				<div className='poll__viewer__div'>
					<PollViewer handleClosePollViewer={handleClosePollViewer} handleBackPollViewer={handleBackPollViewer}/>
				</div>
			}

			{pollAvailable &&
			<div className='poll__div'>
				<Poll creator_id={pollCreatorId} id={pollId} title={pollTitle} description={pollDesc} options={optionList} submitted_by={pollSubmittedBy} total_vote={pollTotalVote} handlePollCloseIconClick={handlePollCloseIconClick} handlePollCloseByUser={handlePollCloseByUser}/>
			</div>
			}

			{	!JSON.parse(localStorage.getItem("profile"))?.data.user.admin &&
				<Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="warning">
					Poll was ended by the creator.
				</Alert>
			</Snackbar>}

        </div>
    )
}
