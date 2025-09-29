//start server

const app = require("./src/app");
const connectDB = require("./src/config/db");
dotenv = require("dotenv");

dotenv.config();
//connect to database
connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

