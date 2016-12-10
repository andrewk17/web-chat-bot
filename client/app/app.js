angular
  .module('app', [
  ])
  .controller('ChatBoxController', [function () {

  }])
  .directive('chatBox', function() {
    return {
      template: `
      <div>
        <ul>
          <li>Welcome to Chat Bot!</li>
        </ul>
        <form>
          <input type="text">
        </form>
      </div>
      `
    }
  })
