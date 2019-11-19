# tech-innovance-task

Show a list of football leagues & teams to select from and link it to a second view with team and their players.

## Getting started

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use standard React's port 3000

### Making requests to the backend API

For convenience, we have a live API server running at : https://www.football-data.org/documentation/quickstart for the application to make requests against.

**General functionality:**

- View all leagues and you can click in detials of it.
- View all teams in the clicked league.
- After click in team it will view all the player in that team.

**The general page breakdown looks like this:**

- Home page (URL: / )
    - List of leagues.
- Teams Page (URL: /leagues/{id} )
    - List of teams in the clicked league.
- Players page (URL: /#/settings )
    - List of players in the clicked teams.

## License
[MIT](https://choosealicense.com/licenses/mit/)
