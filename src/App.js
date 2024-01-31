import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact>
            <Redirect to='/auth'/>
          </Route>
          <Route path='/auth'>
            <Auth/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
