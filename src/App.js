import Layout from  "./Layout/layout";
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Profile from "./Pages/Profile/Profile";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NewPost from "./Pages/NewPost/NewPost";
import { Fragment } from 'react';

function App() {
  const authContext = useAuth();

  const renderPrivateRoutes = (auth) => {
    if(auth.jwt){
      return (
        <Fragment>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/new" exact>
            <NewPost />
          </Route>
        </Fragment>
      )
    }

  }
  return (
    <Layout 
      isAuth={authContext.jwt ? true : false}
      handleSignOut={authContext.signout}
      authToken={authContext.jwt}
      
    > 
    
      <Switch>
        {/* Public routes */}
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact render={props => <Login  />} />
        <Route path="/" render={props => <h1>Home</h1>} exact/>

        {/* Private routes */}

        {renderPrivateRoutes(authContext)}
        
      </Switch>
    </Layout>
  );
}



export default App;
