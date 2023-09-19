import AuthForm from './Authentication/AuthForm';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ViewMail from './RenderMail/ViewMail';
import RenderMail from './RenderMail/RenderMail';
import ComposeMailForm from './ComposeMail/ComposeMail';
import NavBar from './NavBar/NavBar';
import PrivateComponent from './NavBar/PrivateComponent';

function App() {


  const isAuth = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route element={<PrivateComponent />}> */}

          <Route exact path='/auth' element={<AuthForm />} />
          <Route exact path='/viewemail/:id/:render' element={<ViewMail />} />
          <Route exact path='/' element={<RenderMail render={'inbox'} />} />
          <Route exact path='/sent' element={<RenderMail render={'sent'} />} />
          <Route exact path='/composeemail' element={<ComposeMailForm />} />
          {/* <Route exact path='/*' element={<AuthForm />} /> */}
        {/* </Route> */}
      </Routes>
    </>

  );
}

export default App;
