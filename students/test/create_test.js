const assert = require('assert');
const Student = require('../src/students')
describe("Create the first data", () => {
    it("save the student", () => {
        // assert(2 + 3 == 5)
        const jason = new Student({ name: 'jason' });
        jason.save();
    })
})