import Layout from  "./Layout/Layout";
import { useState } from 'react';
import Signup from './Pages/Signup/Signup';
import { Route, Switch } from 'react-router-dom';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  const handleSignOut = event => {
    //Add clean up code for once routing is added
    setIsAuth(false);
  }
  
  const handleLogin = event => {
    //Authentication code once we start adding the backend in
    setIsAuth(true);
  }

  return (
    <Layout
      isAuth={isAuth}
      handleLogin={handleLogin}
      handleSignOut={handleSignOut}
    > 
      <Switch>
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </Layout>
  );
}

export default App;
