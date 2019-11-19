import React, {useState,useEffect,Fragment} from 'react';
import {useParams,useHistory } from 'react-router-dom';
import {  makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import API from './utlis/API';
import ContentLoader from 'react-content-loader';
import './App.css';

const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(1, 2),
    maxWidth: 1000,
    margin: `${theme.spacing(1)}px auto`,
    cursor:'pointer'
  
  }
}));

function LeagueTeams() {

    const TeamsLoader = () => (
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
  let history = useHistory();
  let { id } = useParams();
   const [league,setLeague] = useState([]);
   const [teams,setTeams] = useState([]);
   const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    
    API.get(`/competitions/${id}`)
    .then( response =>  setLeague(response.data))
    .catch( error =>{ alert(error.message + '\n Wait Seconds and try again, It\'s a free account');})
 
   
  }, []);

  useEffect(() => {
    setIsLoading(true);
    API.get(`/competitions/${id}/teams`)
    .then( response =>  {setTeams(response.data.teams); setIsLoading(false);})
    .catch( error => {alert(error.message + '\n Wait Seconds and try again, It\'s a free account'); setIsLoading(false);})
 
  }, [league]);
  
 


  return (
      <Fragment>
  
      <Paper  className={classes.paper}>
        <Box clone pt={2} pr={1} pb={1} pl={2}>
        <Paper elevation={0}>
          <Grid  container spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
              <Box  clone>
             
              <img height='100' src="https://carlisletheacarlisletheatre.org/images/fantasy-football-logo-transparent-5.png" alt="logo" />
        
              </Box>
              
            </Grid>
  
            <Grid item>
  
                  <Typography>{league.name}</Typography>
                  <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item >
                  
              {  league.seasons &&  <Typography noWrap>  <SportsSoccerIcon /> Number of Seasons {league.seasons.length} </Typography >}
                  </Grid>
                  <Grid item  >
                 
                   { teams.length > 0 && <Typography noWrap>  <EmojiPeopleIcon /> Number of Teams {teams.length}</Typography >}
                  </Grid>
                  
                  </Grid>
                  
            </Grid>
            
          </Grid>
          
    
         
        </Paper>
      </Box>
      
      </Paper>
      <Paper elevation={0} className={classes.paper}>
      <Typography variant='h4'> Teams </Typography >
        {
             isLoading ? <TeamsLoader /> : teams.map((team,idx) => 
                <Paper key={idx} className={classes.paper} onClick={() => history.push(`/leagues/${id}/teams/${team.id}`)}>
                <Box clone pt={2} pr={1} pb={1} pl={2}>
                <Paper elevation={0}>
                  <Grid  container spacing={2} alignItems="center" wrap="nowrap">
                    <Grid item>
                      <Box clone>
                      {/* <svg height='20'  width='100' alt="logo" xmlns={team.crestUrl}></svg> */}
                      <img height="100"  src={team.crestUrl ? team.crestUrl : "https://i-love-png.com/images/not-available_7305.png"} />
                      </Box>
                    </Grid>
                    <Grid item>
                          <Typography>{team.name}</Typography>
                    </Grid>
                    
                  </Grid>
                  
              
                 
                </Paper>
              </Box>
              
              </Paper>
            )
        }

      </Paper>
      
        
   

    </Fragment>
  );
}

export default LeagueTeams;
