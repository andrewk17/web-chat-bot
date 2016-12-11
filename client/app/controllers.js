function chatBoxController(msgService, $timeout) {
  const chat = this;

  chat.msgs = msgService.msgs;

  chat.recordResponse = function() {
    if (chat.msg === "/help") {
      msgService.printHelp();
    } else {
      msgService.submitMessage(chat.msg, false);
    }
    chat.msg = '';
  }

  msgService.getBotResponses()
  .then(function(data) {
    msgService.order = data.data.order;
    msgService.botResponses = data.data.responses;
    msgService.getNextBotMsg();
  })
}
angular.module('app').controller('ChatBoxController', ['msgService', '$timeout', chatBoxController]);
