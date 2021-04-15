const {Schema} = require("mongoose");

const kittySchema = new Schema({
    name: {type: String}
});

kittySchema.methods.meow = function () {
    console.log(this.name ? "Meow name is " + this.name + ", nice to meowt you." : "I don't have a name");
}

module.exports = {
    kittySchema
}

