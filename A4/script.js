$(() => {
    $('.submit').on('click', () => {
        let message = $('#message').val() ?? '';

        if (message.length > 0) {
            // Determine if a youtube link is included
            let youtube = message.match(/((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/);

            let embed;
            if (youtube) {
                embed = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${youtube[5]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }

            $('.messages').prepend(
                $('<div></div>', {
                    class: 'col-4 offset-4 rounded mb-3',
                    html: embed ? `<p>${message}</p>${embed}` : message
                })
            );
        }
    });
})