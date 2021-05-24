import Layout from  "./Layout/layout";
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Profile from "./Pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const authContext = useAuth();

  return (
    <Layout 
      isAuth={authContext.jwt ? true : false}
      handleSignOut={authContext.signout}
      authToken={authContext.jwt}
      
    > 
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact render={props => <Login  />} />
        <PrivateRoute path="/profile" exact>
          <Profile />
        </PrivateRoute>
        <Route path="/" render={props => <h1>Home</h1>}/>
      </Switch>
    </Layout>
  );
}

export default App;
