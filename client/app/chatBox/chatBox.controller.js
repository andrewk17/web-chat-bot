'use strict';

function chatBoxController(msgService) {
  const chat = this;

  // chat messages stored in service
  chat.msgs = msgService.msgs;

  chat.recordResponse = function() {
    if (chat.msg === '/help') {
      msgService.printHelp(); // prints help statement
    } else {
      msgService.submitMessage(chat.msg, false);
    }
    chat.msg = ''; // clears input text box after submitting
  };
}

module.exports = chatBoxController;
