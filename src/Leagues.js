import React, {useState,useEffect, Fragment} from 'react';
import { useLocation,useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Route,
  Switch
} from 'react-router-dom';
import LeagueTeams from './LeagueTeams';
import API from './utlis/API';
import TeamPlayers from './TeamPlayers';
import './App.css';
import ContentLoader from 'react-content-loader';




const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
    overflow: 'hidden',
   
  },
  footer: {
    position: 'fixed',
    width: theme.spacing(7),
    minWidth:2000,
    bottom: 0,
    background: 'blue',
    color: 'white'
 },
  header:{

    position: 'sticky',
    top: 0,
  },
  logo: {
    position: 'relative',
    height: 100,
    marginLeft: 300,
    marginRight: 300,
   
  },
  paper: {
    padding: theme.spacing(1, 2),
    maxWidth: 1000,
    margin: `${theme.spacing(1)}px auto`,
  
  }

}));

function Leagues() {

  const LeaguesLoader = () => (
    <Paper  className={classes.paper}>
    <Box clone pt={2} pr={1} pb={1} pl={2}>
    <Paper elevation={0}>
    <ContentLoader 
      height={160}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#0524fa"
    >
      <rect x="70" y="15" rx="4" ry="4" width="117" height="6" /> 
      <rect x="70" y="35" rx="3" ry="3" width="85" height="6" /> 
      <rect x="0" y="80" rx="3" ry="3" width="350" height="6" /> 
      <rect x="0" y="100" rx="3" ry="3" width="380" height="6" /> 
      <rect x="0" y="120" rx="3" ry="3" width="201" height="6" /> 
      <circle cx="30" cy="30" r="30" />
    </ContentLoader>
     
    </Paper>
  </Box>
  </Paper>
  
  )

  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  const [leagues,setLeagues] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  // async function callRequest (){
  //   const response = await fetch('http://api.football-data.org/v2/competitions',{method: 'GET'});
  //   const myJson = await response.json();
  //   setLeagues(myJson.competitions);
  // }
  useEffect(() => {
    setIsLoading(true);
    API.get('/competitions?plan=TIER_ONE')
    .then( response =>  {setLeagues(response.data.competitions);  setIsLoading(false);})
    .catch( error => {alert(error.message + '\n Wait Seconds and try again, It\'s a free account'); setIsLoading(false);})
  //  callRequest();
   
  }, []);
  
  const MainArea = () => {

    return (

      isLoading ? <LeaguesLoader /> : 
        leagues.map( (league,idx) => 
        
        <Paper key={idx} className={classes.paper}>
        <Box clone pt={2} pr={1} pb={1} pl={2}>
        <Paper elevation={0}>
          <Grid  container spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
              <Box bgcolor="primary.main" clone>
             
              <img height='100' src="https://carlisletheacarlisletheatre.org/images/fantasy-football-logo-transparent-5.png" alt="logo" />
        
              </Box>
              
            </Grid>
  
            <Grid item>
                  <Typography>{league.name}</Typography>
            </Grid>
            
          </Grid>
          
          <Grid container spacing={2} alignItems="center" wrap="nowrap">
            <Grid container justify="flex-end" spacing={1}>
            <Grid item>
              <Button onClick={() => history.push('/leagues/'+league.id)} color="primary">Detials</Button>
            </Grid>
          </Grid>
          </Grid>
         
        </Paper>
      </Box>
      </Paper>
      
        
        )
      
    )
  
  }
  


  return (

    <Fragment>   <AppBar color="primary" className={classes.header} >
    <Toolbar  >
       <img className={classes.logo} src="https://carlisletheacarlisletheatre.org/images/fantasy-football-logo-transparent-5.png" alt="logo" />
   </Toolbar>
   
   </AppBar>
      <div className={classes.root}>
     <Paper elevation={0} className={classes.paper}>
      <Typography variant='h4'> Football Leagues</Typography >
      { location.pathname !== '/' && <Breadcrumbs aria-label="breadcrumb">
       <Link color="inherit" onClick={() => history.push('/')} >
           Football Leagues
          </Link>
          { (location.pathname.includes('leagues') && !location.pathname.includes('teams'))  && <Typography color="textPrimary">Teams</Typography> } 
          { location.pathname.includes('teams') && 
          <Fragment>
          <Link color="inherit" onClick={() => history.goBack()}>
          Teams
          </Link> / <Link color="textPrimary">Players</Link> </Fragment> } 
          
        </Breadcrumbs>}
     
      </Paper>

      <Switch>
        {/* No weird props here, just use
            regular `children` eleme    nts! */}
             {/* <Route from="/" to="/leagues" /> */}
             <Route exact path="/" component={MainArea} />
             <Route exact path="/leagues/:id" component={LeagueTeams} />
             <Route  path="/leagues/:id/teams/:teamId" component={TeamPlayers} />
      </Switch>
    </div>
    <div className={classes.footer}>
      <p>@2019 Copy Right for tech-innovance egypt</p>
    </div>
    </Fragment>
  );
}

export default Leagues;
