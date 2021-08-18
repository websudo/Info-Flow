import './App.css';
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import { BrowserRouter as Router , Switch , Route, Link } from 'react-router-dom'

function App() {
  return (
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
  );
}

export default App;
