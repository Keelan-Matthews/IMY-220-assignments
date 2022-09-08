$(() => {
    getEvents('events.json');
})

const getEvents = url => {
    let loaded = new Promise((resolve, reject) => {
        $.getJSON(url)
            .done(data => resolve(data))
            .fail(() => reject("An error occurred while loading events."));
    });

    loaded.then(
        data => {
            let eventCards = sortByDate(data).map((event, index) => createEventCard(event, index));
            $('#eventList').append(eventCards);
        }
    )
}

const createEventCard = ({ title, description, date, attending }, index) => `
    <div class="card mb-3" loading="lazy">
        <div class="card-header">${title}</div>
        <div class="card-body">
            <p>${description}</p>
            <b>${date}</b>
            <p>Will you be attending?</p>
            <div class="form-check" data-correct="true">
                <input class="form-check-input" type="radio" name="eventAttendance${index}" id="event${index}Attending1">
                <label class="form-check-label" for="event${index}Attending1">
                    Yes
                </label>
            </div>
            
            <div class="form-check" data-correct="false">
                <input class="form-check-input" type="radio" name="eventAttendance${index}" id="event${index}Attending2">
                <label class="form-check-label" for="event${index}Attending2">
                    No
                </label>
            </div>
            <div class="alert text-center alert-${attending[0].correct ? 'success' : 'danger'}" role="alert">
                ${attending[0].correct ? 'You are going!' : 'You will not be attending!'}
            </div>
        </div>
    </div>
`;

const sortByDate = json => json.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
);

$('#eventList').on('click', '.form-check-input', function() {
    let correct = $(this).parent().data('correct');
    let alert = $(this).closest('.card').find('.alert');
    alert.removeClass('alert-success alert-danger');
    alert.addClass(`alert-${correct ? 'success' : 'danger'}`);
    alert.text(correct ? 'You are going!' : 'You will not be attending!');
})