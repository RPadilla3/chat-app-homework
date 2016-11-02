(function() {
    'use strict';

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
                .done(function handleSuccess(data) {
                    console.log('it worked', data);
                })
                .fail(function handleFailure(xhr) {
                    console.log('it failed', xhr);
                })
        });



}());
