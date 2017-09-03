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

var makeNode = function(chat) {
  var name = chat.username;
  var room = chat.roomname;
  var message = chat.text;
  var time = chat.createdAt; // immune to XSS attack
  var id = chat.objectId;    // immune to XSS attack

  var $chat = document.createTextNode(name + ' in ' + room + ' said ' + message + ' at ' + time);
  var $chatMsgBox = $('<div class="chat" id="' + id + '"></div>');

  return $chatMsgBox.append($chat);
};


class App {
  constructor () {
    this.server = url;
  }

  init() {
    var makeNode = function(chat) {
      var name = chat.username;
      var room = chat.roomname;
      var message = chat.text;
      var time = chat.createdAt; // immune to XSS attack
      var id = chat.objectId;    // immune to XSS attack
      var $chat = document.createTextNode(name + ' in ' + room + ' said ' + message + ' at ' + time);
      var $chatMsgBox = $('<div class="chat ' + room + '" id="' + id + '"></div>');
      return $chatMsgBox.append($chat);
    };

    var results;

    $.ajax({
      type: 'GET',
      //data: 'where={"username": "Jon"}', 
      data: {'order': '-createdAt'},
      url: url,
      success: function(ajaxResponse) {
        var roomNames = {};
        for (var i = ajaxResponse.results.length - 1; i >= 0; i--) {
          var chat = ajaxResponse.results[i];
          $('#chats').append(makeNode.call(app, chat));
          roomNames[ajaxResponse.results[i].roomname] = ajaxResponse.results[i].roomname;
        }
        $('#chats').scrollTop($('#chats')[0].scrollHeight);

        for (var room in roomNames) {
          var $room = $('<div class="room"></div>');
          $room.append(document.createTextNode(room));
          $('#roomList').append($room);
        }

        $('.room').on('click', function(event) {  
          app.renderRoom($(event.target).text());
        });

      }
    });
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
    $.ajax({
      type: 'GET',
      //data: 'where={"username": "Jon"}', 
      data: {'order': '-createdAt'},
      url: url,
      success: function(ajaxResponse) {
        for (var i = ajaxResponse.results.length - 1; i >= 0; i--) {
          var chat = ajaxResponse.results[i];
          var idLength = $('#' + chat.objectId).length;
          if (idLength === 0) {
            $('#chats').append(makeNode(chat));
          }
        }
        $('#chats').scrollTop($('#chats')[0].scrollHeight);
      }
    });
  }

  clearMessages(id) {
    $(id).empty();
  }
  
  renderMessage(message) {
    $('#chats').append(`<p>${message}</p>`);

  }
  
  renderRoom(roomname) {
    var $room = $('.' + roomname);
    $('.chat').not($room).hide();
    $($room).show();
    $('#chats').scrollTop($('#chats')[0].scrollHeight);
    // this.clearMessages('#chats');
    // $.ajax({
    //   type: 'GET',
    //   data: 'where={"roomname": "' + roomname + '"}',
    //   url: url,
    //   success: function(ajaxResponse) {
    //     for (var i = ajaxResponse.results.length - 1; i >= 0; i--) {
    //       var chat = ajaxResponse.results[i];
    //       var idLength = $('#' + chat.objectId).length;
    //       if (idLength === 0) {
    //         $('#chats').append(makeNode(chat));
    //       }
    //     }
    //     $('#chats').scrollTop($('#chats')[0].scrollHeight);
    //   }
    // });
  }

}


var app = new App();

$('document').ready(function() {
  var values;
  
  app.init();
  
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
      app.fetch();    
    }
  });



  // setInterval(() => {
  //   app.fetch();
  // }, 30000);

  // fetch and display data
  // console.log(app.data);
  // app.data.forEach(function(item) {
  //   console.log(item);
  //   $('#chats').append(something(item));
  // });
});



