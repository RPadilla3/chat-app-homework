(function() {
    'use strict';

    window.chat = window.chat || {};
    var userToken;
    var userName;

    window.chat.listenForMessages(function messageHandler(data) {

        $('.send-message')
            .on('submit', function message(event) {
                event.preventDefault();
                $.ajax({
                        url: '/chat',
                        method: 'POST',
                        data: {
                            message: $('.message').val()
                        }
                        headers: {
                            Authorization: userToken
                        }
                    })
                    .done(function handleYes(success) {
                        console.log('lit', success);
                    })
                    .fail(function handleNo(xhr) {
                        console.log('nope', xhr);
                    })
            })

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



}());