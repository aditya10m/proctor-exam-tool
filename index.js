const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const fileUpload = require('express-fileupload')
const users = require("./routes/api/Users");
const exams = require("./routes/api/Exams");
const logs = require("./routes/api/Logs");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(
bodyParser.urlencoded({
extended: false
})
);
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/exams",exams);
app.use("/api/logs",logs);
const db = require("./config/keys").mongoURI;
mongoose
.connect(
db, { useNewUrlParser: true }
)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));
app.get("/api", (req, res) => {
res.json({ message: "Hello from server!" });
});
13
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});