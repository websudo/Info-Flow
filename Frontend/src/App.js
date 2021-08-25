import './App.css';
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import { BrowserRouter as Router , Switch , Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={ store }>
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
