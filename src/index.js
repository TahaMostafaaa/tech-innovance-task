import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Leagues from './Leagues';
import LeagueTeams from './LeagueTeams';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'

ReactDOM.render(
<Router>
    <Fragment>
    
        {/* No weird props here, just use
            regular `children` eleme    nts! */}
             {/* <Route from="/" to="/leagues" /> */}
             <Route  path="/" component={Leagues} />
         
   
  
    </Fragment>
  </Router>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
