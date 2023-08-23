const express = require("express");
const app = express();
// const authRoute = require("./routers/auth");
// const postsRoute = require("./routers/posts");
// const usersRoute = require("./routers/users");
const primeRoute = require("./routers/prime");
const carRoute = require("./routers/car");
// const subRoute = require("./routers/sub");

const cors = require("cors");

// require("dotenv").config();

// const PORT = process.env.PORT || 10000;
const PORT = 5000;

app.use(cors());
app.use(express.json());
// app.use("/api/auth", authRoute);
// app.use("/api/posts", postsRoute);
// app.use("/api/users", usersRoute);
app.use("/api/prime", primeRoute);
app.use("/api/car", carRoute);
// app.use("/api/sub", subRoute);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
