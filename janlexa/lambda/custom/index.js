'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, questionsHandlers, conclusionHandlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'SayHello': function () {
        this.handler.state = "_QUESTION"
        this.response.speak('Hello World! Say yes or no.')
                     .listen('Can you say yes, no?');
        this.emit(':responseReady');
    },
    'SayHelloName': function () {
        var name = this.event.request.intent.slots.name.value;
        this.response.speak('Hello ' + name)
            .cardRenderer('hello world', 'hello ' + name);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent' : function() {
        this.response.speak("You said yes.");
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent' : function() {
        this.response.speak("You said no.");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};

var questionsHandlers = Alexa.CreateStateHandler("_QUESTION", {

    'AMAZON.YesIntent' : function() {
        this.handler.state = "_CONCLUSION";
        this.response.speak("You said yes in question handler. Would you like to hear the conclusion?")
            .listen('Would you like to hear the conclusion?');

        this.emit(':responseReady');
    },
    'AMAZON.NoIntent' : function() {
        this.handler.state = "_CONCLUSION";
        this.response.speak("You said no in no handler. Would you like to hear the conclusion?")
            .listen('Would you like to hear the conclusion?');
        this.emit(':responseReady');
    }

});

var conclusionHandlers = Alexa.CreateStateHandler("_CONCLUSION", {

    'AMAZON.YesIntent' : function() {
        this.response.speak("You said yes in conclusion handler.");
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent' : function() {
        this.response.speak("You said no in conclusion handler.");
        this.emit(':responseReady');
    }

});
