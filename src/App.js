import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';

import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Forgotpassword from './components/Auth/Forgotpassword';

function App() {
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  // const token=window.localStorage.getItem('usertoken')
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact>
            {isAuth?<Redirect to='/profile'/>:<Redirect to='/auth'/>}
          </Route>
          <Route path='/auth' exact>
            <Auth/>
          </Route>
          <Route path='/auth/forgot-password' >
              <Forgotpassword/>
            </Route>
          <Route path='/profile'>
            {isAuth ? <Profile/> : <Redirect to="/auth"/>}
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
