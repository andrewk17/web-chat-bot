const commands = require('./chatBox.config.js');

function msgService($http) {
  const services = this,
    ONBOARDING_COMPLETE = 'Thanks! The onboarding is complete.';
  let currentPromptIndex = 0,
    order,
    botResponses,
    userName;

  // messages seeded with welcoming messages
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
    // always add message from user to array of messages
    addMessage(msg, false);
    // check for start over command
    if (msg === 'Start over.') {
      // restarts bot questions
      currentPromptIndex = 0;
      getNextBotMsg();
    } else if (commands[msg]) {
      // retrieves user data from DB
      retrieveData(userName, commands[msg]);
    } else {
      // save username if the user is responding to first question
      if (currentPromptIndex === 1) {
        userName = msg;
      }
      // only fetch next robot question if there is another question
      if (currentPromptIndex <= order.length) {
        const prevBotQuestion = order[currentPromptIndex - 1]; // getting the just asked question
        postMsg(msg, prevBotQuestion);
        getNextBotMsg();
      }
    }
  }

  // Adds help message to array of messages
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
    let response;
    if (currentPromptIndex < order.length) {
      mostRecentResponse = order[currentPromptIndex - 1];
      response = botResponses[mostRecentResponse];
    } else {
      response = ONBOARDING_COMPLETE;
    }
    addMessage(response, true);
  }

  // gets the next question for the bot to ask user
  function getNextBotMsg() {
    let response;
    if (currentPromptIndex < order.length) {
      let nextResponse = order[currentPromptIndex];
      response = botResponses[nextResponse];
    } else {
      response = ONBOARDING_COMPLETE;
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

module.exports = msgService;
