require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session')
const cookieParser = require("cookie-parser");
const cors = require('cors');
// const mongoStore = require('connect-mongo');

// const store = new mongoStore({
//   collection: "userSessions",
//   uri: process.env.DATABASE_URL,
//   expires: 1000,
// });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const oneDay = 1000 * 60 * 60 * 24;

// allows server to accept json
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    // store: store,
    saveUninitialized: false,
    resave: false,
    cookie: {
        sameSite: false,
        // httpOnly set to true means cookie can only be read by http and not by client side javascript(security)
        httpOnly: true,
        maxAge: oneDay,
        secure: false
    }
 }))
 app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

// const for different routes which will be used for db reqs
const matchesRouter = require("./routes/matches");
app.use("/matches", matchesRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const teamRouter = require("./routes/teams");
app.use("/teams", teamRouter);

const playerRouter = require("./routes/players");
app.use("/players", playerRouter);

const exportRouter = require("./routes/exportmatch");
app.use("/exportmatch", exportRouter);

app.listen(3001, () => console.log("Server listening on port 3001"));
