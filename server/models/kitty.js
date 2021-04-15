const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const KittySchema = new Schema({
    name: {type: String}
});

KittySchema.methods.meow = function () {
    console.log(this.name ? "Meow name is " + this.name + ", nice to meowt you." : "I don't have a name");
}

module.exports = mongoose.model("Kitty", KittySchema);


