import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Forgotpassword from './components/Auth/Forgotpassword';

function App() {
  const token=window.localStorage.getItem('usertoken')
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact>
            <Redirect to='/auth'/>
          </Route>
          <Route path='/auth' exact>
            <Auth/>
          </Route>
          <Route path='/auth/forgot-password' >
              <Forgotpassword/>
            </Route>
          <Route path='/profile'>
            {token ? <Profile/> : <Redirect to="/auth"/>}
          </Route>
          <Route path='*' exact>
            <p>404 ERROR : PAGE NOT FOUND</p>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
