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
      
    X input field for collecting messages
    X  button for posting message
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
var data;

class App {
  constructor () {
    this.server = url;
    this.data;
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
  }

  fetch() {
    var something = function(item) {
      var name = item.username;
      var room = item.roomname;
      var message = item.text;
      
      return document.createTextNode(name + ' in ' + room + ' said ' + message);
    };
    $.ajax({
      type: 'GET',
      //data: 'where={"username": "Jon"}', 
      data: {'order': '-createdAt'},
      url: url,
      success: function(ajaxResponse) {
        for (var i = 0; i < ajaxResponse.results.length; i++) {
          var post = ajaxResponse.results[i];
          var $post = something(post);
          $('#chats').append('<p class="post">', $post, '</p>');
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



$('document').ready(function() {
  var values;

  
  var app = new App();
  // send message when return key is pressed
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
  app.fetch();
  // fetch and display data
  // console.log(app.data);
  // app.data.forEach(function(item) {
  //   console.log(item);
  //   $('#chats').append(something(item));
  // });
});



