class Person {
    constructor(name) {
        this.name = name;
    }
}
function fn(person) {
    console.log(person.name);
}
module.exports = {
    Person,
    fn
}