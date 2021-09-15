import './App.css';
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Post from './pages/post_page/Post';
import Index from './pages/index/Index'
import { BrowserRouter as Router , Switch , Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={ store }>
    <div className="App">
      <Router>
        <Switch>

          <Route path='/' exact >
            <Index />
          </Route>

          <Route path='/home'>
            <Home />
          </Route>
          
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/postpage'>
            <Post />
          </Route>
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
