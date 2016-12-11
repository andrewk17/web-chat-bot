const commands = require('./commands.config.js');

function msgService($http) {
  const services = this;
  var currentPromptIndex = 0,
    order,
    botResponses,
    userName;

  services.msgs = [
    {
      msg: 'Hey there! My name is Stella.',
      bot: true
    }, {
      msg: 'If you need any help, enter /help for a list of commands.',
      bot: true
    }
  ];

  services.submitMessage = function(msg) {
    addMessage(msg, false);
    if (msg === 'Start over.') {
      currentPromptIndex = 0;
      getNextBotMsg();
    } else if (commands[msg]) {
      retrieveData(userName, commands[msg]);
    } else {
      if (currentPromptIndex === 1) {
        userName = msg;
      }
      if (currentPromptIndex <= order.length) {
        const prevBotQuestion = order[currentPromptIndex - 1];
        postMsg(msg, prevBotQuestion);
        getNextBotMsg();
      }
    }
  }

  services.printHelp = function() {
    addMessage(commands.printHelp, true);
  }

  // adds message to array of messages
  // can be either bot or user message
  function addMessage(msg, botFlag) {
    services.msgs.push({msg: msg, bot: botFlag})
  }

  // gets the same bot msg as last timeout
  // useful for when user has not progressed with onboarding
  function getSameBotMsg() {
    var response;
    if (currentPromptIndex < order.length) {
      mostRecentResponse = order[currentPromptIndex - 1];
      response = botResponses[mostRecentResponse];
    } else {
      response = 'Thanks! The onboarding is compvare.';
    }
    addMessage(response, true);
  }

  // gets the next question for the bot to ask user
  function getNextBotMsg() {
    var response;
    if (currentPromptIndex < order.length) {
      nextResponse = order[currentPromptIndex];
      response = botResponses[nextResponse];
    } else {
      response = 'Thanks! The onboarding is compvare.';
    }
    currentPromptIndex++;
    addMessage(response, true);
  }

  // sends user data to backend
  function postMsg(msg, key) {
    const data = {
      name: userName,
      field: {
        key: key,
        value: msg
      }
    };

    $http.post('/users', data).catch(function(err) {
      console.log('Error', err);
    })
  }

  // retrieves user data from backend
  function retrieveData(userName, key) {
    $http.get('/users', {
      params: {
        userName: userName
      }
    }).then(function(data) {
      addMessage(data.data[key], true);
      getSameBotMsg();
    }).catch(function(err) {
      console.log(err);
    })
  }

  // gets entire set of bot questions
  function getAllBotQuestions() {
    $http.get('/bot/questions').then(function(data) {
      order = data.data.order;
      botResponses = data.data.questions;
      getNextBotMsg();
    });
  }

  // retrives bot questions from backend
  getAllBotQuestions();
}

angular.module('app').service('msgService', msgService);
