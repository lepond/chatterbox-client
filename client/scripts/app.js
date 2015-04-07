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
$(document).ready( function () {
  var Message = function (username, message, roomname) {
    this.username = username;
    this.text = message;
    this.roomname = roomname || "default";
  };

  $( "button" ).on( "click", function() {
      var username = window.location.search.slice(10);
      var message = $("input.message").val();
      //var roomname = $("input.roomname").val(); retrieve roomname from html
      var data = new Message(username, message);
      if (data.text) {
        $.ajax({
          'url': 'https://api.parse.com/1/classes/chatterbox',
          'type': 'POST',
          'data': JSON.stringify(data),
          'contentType': 'application/json',
          success: function (data) {
            console.log('chatterbox: Message sent');
          },
          error: function (data) {
            // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message');
          }
        });
      } else {
        console.log("Must add message.")
      }
  }); 

  var placeMessages = function (array) {
  for (var i = array.length - 1; i > array.length - 21; i--) {
    var message = array[i].text;
    var username = array[i].username;
    var chatroom = array[i].roomname;
    $('.chatroom div').prepend('div').text(username + ": " + message);
  }
};

  var retrieveMessages = function () {
    var message = $.ajax({
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'type': 'GET',
      //'data': JSON.stringify(data),
      'contentType': 'application/json',
      success: function (data) {
        console.log('Chatterbox: Messages Loaded');
          },
      error: function (data) {
              // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to Load New Messages');
            }
    });
  console.log(message);
    placeMessages(message.responseJSON.results);
  };
  

retrieveMessages();
//setInterval(retrieveMessages, 2000);

});


// Friend Storage
  // add class to users whose names are clicked on