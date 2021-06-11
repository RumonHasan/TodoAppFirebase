import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// components
import Dashboard from './component/Dashboard/Dashboard';
import SignUp from './component/SignUp/SignUp';
import Login from './component/Login/Login';

// global provider 
import { GlobalProvider } from './context/mainContext';

const App = () => {
    return (
        <Router>
          <GlobalProvider>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
            </Switch>
          </GlobalProvider>
        </Router>
    )
}

export default App;