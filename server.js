require("dotenv").config();
const express = require("express");
const db = require("./config/db_config");
const path = require("path");
const cookieParser = require("cookie-parser");

// Routers
const home = require("./Routers/home");
const auth = require("./Routers/auth");
const profile = require("./Routers/profile");

// PORT
const PORT = process.env.PORT || 5000;

// App
const app = express();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./customer-client/build")));
app.use(express.static(path.resolve(__dirname, "./admin-client/build")));

// Routes
app.use("/home", home);
app.use("/profile", profile);
app.use("/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.get("/admin", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "admin-client", "build", "index.html")
    );
  });
  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "customer-client", "build", "index.html")
    );
  });
}

// Listen
app.listen(PORT, () => {
  console.log("Server is up and running!");
});
