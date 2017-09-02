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
    X refresh functionality
    way to display existing rooms
      enter existing rooms
    way to create rooms
    display current users
      friend button
      
    X messages need to be in an object
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
        console.log('successfully submitted', data);
      },
      error: function(data) {
        console.log('failed to send message', data);
      }
    });
  }

  fetch() {
    var something = function(item) {
      var name = item.username;
      var room = item.roomname;
      var message = item.text;
      var time = item.createdAt;
      
      return document.createTextNode(name + ' in ' + room + ' said ' + message + ' at ' + time);
    };
    $.ajax({
      type: 'GET',
      //data: 'where={"username": "Jon"}', 
      data: {'order': '-createdAt'},
      url: url,
      success: function(ajaxResponse) {
        for (var i = 0; i < ajaxResponse.results.length; i++) {
          var chat = ajaxResponse.results[i];
          var $chat = something(chat);
          // make a name object with anchor tag
          // append name node to #chats
            //append the rest of the message the name node
          var $chatmessagebox = $('<div class="chat"></div>');
          $chatmessagebox.append($chat);
          $('#chats').append($chatmessagebox);
          

          // <div class="chat roomname"><div class="username">USER</div>TEXTTEXTTEXT</div>

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

  // send message when return key is pressed
  $('#chatInput').on('keypress', function(event) {
    if (event.keyCode === 13) {
      values = $('#chatMessage').val();
      var message = {};
      message.username = window.location.search.slice(10);
      message.roomname = '4chan';
      message.text = values;
      app.send(message);
      event.preventDefault();
      $('#chatMessage').val('');    
    }
  });

  // setInterval(() => {
    app.clearMessages(); 
    app.fetch();
  // }, 3000);

  // fetch and display data
  // console.log(app.data);
  // app.data.forEach(function(item) {
  //   console.log(item);
  //   $('#chats').append(something(item));
  // });
});



