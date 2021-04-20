const Redux = require("redux");
const allReducers = require("./index")

const storeSingleton = (function(){
    let instance = null;
    return {
        getInstance: function() {
            if (instance === null) {
                instance = Redux.createStore(allReducers);
            }
            return instance;
        }
    };
})();

module.exports = storeSingleton