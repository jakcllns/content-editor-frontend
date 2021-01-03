import Layout from  "./Layout/layout";
import { useState } from 'react';

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
      <h1>Hello</h1>
    </Layout>
  );
}

export default App;
