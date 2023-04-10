import { app } from "./index.js";
import { connectDB } from "./data/database.js";
// database connect

connectDB();

app.listen(process.env.PORT, () => {
  console.log("server is working");
});
