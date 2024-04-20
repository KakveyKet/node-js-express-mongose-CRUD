const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/students_test", { useNewUrlParser: true, debug: true });
mongoose.connection.once("open", () => console.log("connected")).on("error", (err) => console.log(err));