const {kittySchema} = require("./schema/kitty");

module.exports = function(mongoose) {
    return models = {
        Kitty : mongoose.model('kitties', kittySchema),
    };
}

