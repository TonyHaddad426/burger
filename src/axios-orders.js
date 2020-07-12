import axios from "axios";

// store a common instance of the URL path to your database
const instance = axios.create({
  baseURL: "https://testdb-79d62.firebaseio.com/"
});

export default instance;