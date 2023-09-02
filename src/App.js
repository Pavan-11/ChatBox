import AuthForm from './Authentication/AuthForm';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './profile/profile';
function App() {


  const isAuth = useSelector(state => state.auth.isLoggedIn);
  return (
    <Switch>
        <Route path='/auth' component={AuthForm} />
        <Route path='/profile'>
          {isAuth ? <Profile /> : <Redirect to='/auth' />}
        </Route>

        <Redirect from='/' to='/auth' />
    </Switch>
  );
}

export default App;
