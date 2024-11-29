const express = require("express");
const cors = require("cors");
const peopleRoutes = require("./routes/people.route");
const authRoutes = require("./routes/auth.route");
const formFieldsRoutes = require("./routes/form-fields.route");
const userRoutes = require("./routes/user.route");
const eventRoutes = require("./routes/event.route");
const app = express();
app.use(express.json());
app.use(cors());
// Rotas
app.use("/people", peopleRoutes);
app.use("/auth", authRoutes);
app.use("/form-fields", formFieldsRoutes);
app.use("/user", userRoutes);
app.use("/events", eventRoutes);

module.exports = app;
