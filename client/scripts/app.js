// YOUR CODE HERE:

/*

  URL -  http://parse.sfm8.hackreactor.com/chatterbox/classes/messages 

  Input:
  Output: 

  Explanation:
    Setup a way to refresh the displayed messages (either automatically or with a button)

    Allow users to select a user name for themself and to be able to send messages

    Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.

    Allow users to 'befriend' other users by clicking on their user name

    Display all messages sent by friends in bold

*/


class App {
  constructor () {

  }

  init() {

  }

  send(message) {
    $.ajax({
      type: 'POST',
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      data: message
    });
  }

  fetch(user) {
    $.ajax({
      type: 'GET'
 //     url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
    })
  }


}

var app = new App();