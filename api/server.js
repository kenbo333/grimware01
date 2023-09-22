const express = require("express");
const app = express();
// const authRoute = require("./routers/auth");
// const postsRoute = require("./routers/posts");
// const usersRoute = require("./routers/users");
const companiesRoute = require("./routers/companies");
const carsRoute = require("./routers/cars");
const remarksRoute = require("./routers/remarks");
// const subRoute = require("./routers/sub");

const cors = require("cors");

// require("dotenv").config();

// const PORT = process.env.PORT || 10000;
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api/auth", authRoute);
// app.use("/api/posts", postsRoute);
// app.use("/api/users", usersRoute);
app.use("/api/companies", companiesRoute);
app.use("/api/cars", carsRoute);
app.use("/api/remarks", remarksRoute);
// app.use("/api/sub", subRoute);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
