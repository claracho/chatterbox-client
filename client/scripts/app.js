// YOUR CODE HERE:

/*

  URL -  http://parse.sfm8.hackreactor.com/chatterbox/classes/messages 

  Input:
  Output: 
  
  Fetch Object Structure:
  data.results =
  [
  {"objectId":"b8s8y48AXC",
  "username":null,
  "roomname":null,
  "text":null,
  "createdAt":"2017-05-27T18:59:15.320Z",
  "updatedAt":"2017-06-24T21:36:48.320Z"}
  ]
    
  Explanation:
    Setup a way to refresh the displayed messages (either automatically or with a button)

    Allow users to select a user name for themself and to be able to send messages

    Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of 
    messages, so you'll need to filter them somehow.

    Allow users to 'befriend' other users by clicking on their user name

    Display all messages sent by friends in bold
    
    
    TODO list:
    object for storing user data
      username
      friends list
      
    input field for collecting messages
      button for posting message
    refresh functionality
    way to display existing rooms
      enter existing rooms
    way to create rooms
    display current users
      friend button
      
    messages need to be in an object
      CSS to bold friend messages
      
      
    Style the page
    
    -----------------
    maybe change username
    

*/
const url = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

class App {
  constructor () {
    this.server = url;
  }

  init() {

  }

  send(message) {
    $.ajax({
      type: 'POST',
      url: url,
      data: message,
      success: function(data) {
        alert(`successfully submitted ${data}`);
      },
      error: function(data) {
        alert('failed to send message', data);
      }
    });
    alert('hi');
  }

  fetch() {
    $.ajax({
      type: 'GET',
      //data: {results: 'resultsArray'},
      //data: 'where={"username": "Jon"}', 
      data: {'order': '-createdAt'},
      url: url,
      success: function(data) {
        for (var item of data.results) {
          console.log(item);
        }
      }
    });
  }

  clearMessages() {
    $('#chats').empty();
  }
  
  renderMessage(message) {
    $('#chats').append(`<p>${message}</p>`);
  }
  
  renderRoom(room) {
    $('#roomSelect').append(`<div>${room}</div>`);
  }

}

var app = new App();

$('document').ready(function() {
  var values;
  $('#chatInput').on('keypress', function(e) {
    if (e.keyCode === 13) {
      values = $('input').val();
      var message = {};
      message.username = 'Jon';
      message.roomname = '4chan';
      message.text = values;
      app.send(message);
    }
  });

});



