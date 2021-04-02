import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Create from './components/pages/Create';
import Recipe from './components/pages/Recipe';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Logout from './components/pages/Logout';

function App() {
  return (
    <Router>
      <div className='mx-auto flex justify-center bg-white max-w-sm min-h-screen'>
        <div className='w-10/12'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/logout'>
              <Logout />
            </Route>
            <Route exact path='/create'>
              <Create />
            </Route>
            <Route exact path='/recipe/:id'>
              <Recipe />
            </Route>
            <Route exact path='/create/:id'>
              <Create />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
