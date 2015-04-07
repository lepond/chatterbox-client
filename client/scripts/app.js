// YOUR CODE HERE:

// FUNCTION: display messages retrieved from parse server
      // Are all retrieved in one get or separately? Or just unretrieved?
  // create create REST GET request to Parse.com
  // call Escape
  // call create new element
  // prepend div to specified chat
//invoke display messages at setInterval

// Escape Text
// Create new element with data parsed (username, text, etc.)


// Function: Set Username
  // takes the username and formats it
  // 
  // displays option for message
// 
//Sample POST request


//MESSAGE BUILDER
  // username
  // message
  // chatroom: chatroom (via jquery) || default chatroom

var escapeHTML = function (string) {
  var charCode;
  for(var index = 0; index < string.length; index++) {
    charCode = string.charCodeAt(index);
    //if( (charCode >= 58 && charCode <= 64) ||
    //  (charCode >= 33 && charCode <=47) ) {
    if(charCode >= 60 && charCode <=62 ) {
      string = string.slice(0,index) + string.slice(index+1);
    }
  }
  return string;
};

var Message = function (username, message, roomname) {
    this.username = username;
    this.text = message;
    this.roomname = roomname || "default";
  };

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: []
};
app.init = function () {};
app.send = function(message) {
      $.ajax({
        'url': app.server,
        'type': 'POST',
        'data': JSON.stringify(message),
        'contentType': 'application/json',
        success: function (message) {
          console.log('chatterbox: Message sent');
        },
        error: function (message) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
  };

app.fetch = function () {
    $.ajax({
      'url': app.server, 
      'type': 'GET',
      'data': {
        'order': '-createdAt'
      },
      'contentType': 'application/json',
      success: function (data) {
        console.log('Chatterbox: Messages Loaded');
        placeMessages(data.results);
          },
      error: function (data) {
              // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to Load New Messages');
      placeMessages(data.results)
            }
    });
  }; 
app.addMessage = function(message) {
    var text = escapeHTML(String(message.text)); 
    //console.log(message);
    var username = escapeHTML(String(message.username));
    var chatroom = message.roomname;
    if (app.friends.indexOf(username) !== -1) {
      $('#chats').append('<div class="' +username+ ' friend">'+username+ ': ' + text +'</div>');
    } else {
      $('#chats').append('<div class =" ' +username+ '">'+username+ ': ' + text +'</div>');
    }
    $("."+username).on('click', function () {app.addFriend(username);});
};

app.clearMessages = function () {
  $('#chats').empty();
};

app.addRoom = function (roomname) {
  $("#roomSelect").append('<input type="button" value='+roomname+'>');
  $('#chats').append('div').addClass(roomname);
};

app.addFriend = function (username) {
  $("."+username).addClass('friend');
  if (app.friends.indexOf(username) === -1) {
    app.friends.push(username);
  }
};

$(document).ready( function () {
  

$( "button" ).on( "click", function () {
  //var roomname = $("input.roomname").val(); retrieve roomname from html
  var data = new Message(window.location.search.slice(10), $("input.message").val());
  app.send(data)}); 

  var placeMessages = function (array) {
  for (var i = 0; i < array.length; i++) {
    app.addMessage(array[i]);
    // var message = escapeHTML(String(array[i].text)); 
    // console.log(message);
    // var username = escapeHTML(String(array[i].username));
    // var chatroom = array[i].roomname;
    // $('#chats').append('<div>'+username+ ': ' + message +'</div>');
  }
};

  

  var retrieveMessages = function () {
    $.ajax({
      'url': 'https://api.parse.com/1/classes/chatterbox', //'https://api.parse.com/1/classes/chatterbox',
      'type': 'GET',
      'data': {
        'order': '-createdAt'
      },
      'contentType': 'application/json',
      success: function (data) {
        console.log('Chatterbox: Messages Loaded');
        placeMessages(data.results);
          },
      error: function (data) {
              // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to Load New Messages');
      placeMessages(data.results)
            }
    });
  };
  

retrieveMessages();
//setInterval(retrieveMessages, 2000);

});


// Friend Storage
  // add class to users whose names are clicked on