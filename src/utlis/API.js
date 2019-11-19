import axios from "axios";

export default axios.create({
  baseURL: "http://api.football-data.org/v2/",
  responseType: "json",
  headers: {
   "X-Auth-Token": "1ed91770e56046da95bae05c3176adf7"
  }
});