$('#submitBtn').on('click', () => {
    let username = $('#username').val();
    let password = $('#password').val();

    getUser(username, password).then(user => getEvents(user.userID)).then(e => {
        $('<p></p>').html(`<span class="font-weight-bold">Hi, </span> ${username}`).appendTo('.events');
        $('<p></p>').text('Here are your upcoming events:').appendTo('.events');
        $('<div></div>').addClass('row').appendTo('.events');

        $('.events .row').html(e.map(event => card(event)).join(''));
    });
});

const card = ({title, description, date}) => {
    return `<div class="card col-4">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="font-weight-bold">${date}</p>
                </div>
            </div>`
}

const getUser = (username, password) => {
    return new Promise((res, rej) => {
        $.getJSON("users.json", data => {
            let user = data.find(user => user.username === username && user.password === password);

            if (user) {
                res(user);
            } else {
                rej("User not found");
            }
        });
    })
}

const getEvents = (id) => {
    return new Promise((res, rej) => {
        $.getJSON("events.json", data => {
            let events = data.filter(event => event.attending.includes(id));

            if (events) {
                res(events);
            } else {
                rej("No events found");
            }
        });
    })
}
