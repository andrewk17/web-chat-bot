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
}
angular.module('app').controller('ChatBoxController', ['msgService', '$timeout', chatBoxController]);
