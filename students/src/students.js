const mongose = require('mongoose');
const Schema = mongose.Schema;

const studentsSchema = new Schema({
    name: String,

})
const Student = mongose.model("student", studentsSchema);

module.exports = Student;