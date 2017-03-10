
window.onload = function() {

console.log('chat.js works')

    var messages = [];
    var socket = io.connect();

    var message = document.getElementById("message");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            
                var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

sendButton.onclick = sendMessage = function() {
    console.log("i was clicked");
    $.ajax({
            method: "GET", 
            url:"/markov/one"
        }).done(function(data){
            var $message = $('#message')
            console.log(data.markovMsg);
            // socket.emit('send message', {msg: $message.val(), markovMsg: data.markovMsg});
            // $('#content').append('<div class="well">'+data.msg1+'</div>');
            // $('#content').append('<div class="well">'+data.markovMsg+'</div>');
            socket.emit('send', {message:data.markovMsg})
            $message.val('');
        })    
    //         socket.on('newMessage', function(data){
    // console.log(data)
        // });
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = message.value;
            socket.emit('send', { message: text, username: name.value });
        }
    console.log(messages)
    };
  }


//Key Press
	$("#message").keydown(function(e) {
		if(e.keyCode == 13) {
			sendMessage();
		}
	});

console.log(messages)

