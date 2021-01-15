import Layout from  "./Layout/Layout";
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
 
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
        <Route path="/" render={()=> console.log(authContext)}/>
      </Switch>
    </Layout>
  );
}

export default App;
