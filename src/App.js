import Layout from  "./Layout/Layout";
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Button } from "@material-ui/core";
 
function App() {
  const authContext = useAuth();

  const refreshToken = () => {
    let newJwt;
    fetch(
      'http://localhost:8000/refresh-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }
    ).then(res =>{
      return res.json();
    }).then(resData => {
      console.log(resData);
    }).catch(err => console.log(err));

    

  }

  return (
    <Layout 
      isAuth={authContext.jwt ? true : false}
      handleSignOut={authContext.signout}
      authToken={authContext.jwt}
      
    > 
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact render={props => <Login  />} />
        <Route path="/" render={props => <Button onClick={refreshToken}>Refresh Token</Button>}/>
      </Switch>
    </Layout>
  );
}

export default App;
