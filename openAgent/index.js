var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    'LaunchRequest': function () {
        this.emit(':ask', 'Hi there. Can you say your name?', 'Say: hello');
    },
    'realestateIntent': function() {
        var nameSlot = this.event.request.intent.slots.name.value;
        this.emit(':tell', `Hello, nice to meet you ${nameSlot}!`);
    }

};