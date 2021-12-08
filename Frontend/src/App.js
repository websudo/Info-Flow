import './App.css';
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Post from './pages/post_page/Post';
import Index from './pages/index/Index'
import Chat from './pages/chat/Chat'
import { BrowserRouter as Router , Switch , Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import {Offline , Online} from 'react-detect-offline'
import NotOnline from './pages/offline/Offline';

function App() {
  return (
    <Provider store={ store }>
    <div className="App">

      {/* <Online> */}
      <Router>
        <Switch>

          <Route path='/' exact >
            <Index />
          </Route>

          <Route path='/home'>
            <Home />
          </Route>

          <Route path='/chat'>
            <Chat/>
          </Route>
          
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/postpage'>
            <Post />
          </Route>

          <Route path='/offline'>
            <NotOnline/>
          </Route>

        </Switch>
      </Router>
      {/* </Online> */}
      {/* <Offline>
        <NotOnline/>
      </Offline> */}
    </div>
    </Provider>
  );
}

export default App;
