(function() {
    'use strict';

    window.chat = window.chat || {};
    var userToken;
    var userName;
    var userMessage;

    window.chat.listenForMessages(function messageHandler(data) {
        $('.messages')
            .append('<p>' + data.message + '</p>');
    });

    $('.login')
        .on('submit', function login(event) {
            event.preventDefault();
            console.log('username', $('.username').val());
            $.ajax({
                    url: '/login',
                    method: 'POST',
                    data: JSON.stringify({
                        username: $('.username').val()
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .done(function handleSuccess(success) {
                    userToken = success.token;
                    console.log(userToken);
                })
                .fail(function handleFailure(xhr) {
                    console.log('It failed', xhr);
                })
        });

    $('.send-message')
        .on('submit', function message(event) {
            event.preventDefault();
            $.ajax({
                    url: '/chat',
                    method: 'POST',
                    data: JSON.stringify({
                        message: $('.message').val()
                    }),
                    headers: {
                        Authorization: userToken,
                        'Content-Type': 'application/json'
                    }
                })
                .done(function handleYes(success) {
                    userMessage = success.message;
                })
                .fail(function handleNo(xhr) {
                    console.log('nope', xhr);
                });
        });

}());
