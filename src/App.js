import Layout from  "./Layout/Layout";
import { useContext } from 'react';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from './context/auth-context';

function App() {
  const authContext = useContext(AuthContext);

  
  return (
    <Layout 
      isAuth={authContext.jwt}
      handleSignOut={authContext.signout}
      authToken={authContext.jwt}

    > 
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact render={props => <Login  />} />
        <Route path="/" render={()=> console.log(authContext)}/>
      </Switch>
    </Layout>
  );
}

export default App;
