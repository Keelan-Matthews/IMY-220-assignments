import React from 'react';
import { createRoot } from 'react-dom/client';;
import EventList from './components/EventList.jsx';
import "bootstrap/dist/css/bootstrap.min.css";

var events = [
	{name: "Picnic", description: "Picnic in the park", date: "2022/09/03"},
	{name: "Rock concert", description: "Rock concert at the football stadium", date: "2022/08/13"},
	{name: "Golf day!", description: "Golf day at the local golf course", date: "2022/09/03"},
	{name: "Braai in the park", description: "braai at the community swimming pool", date: "2022/11/05"},
	{name: "Festival", description: "Summer music festival with a lot of artists performing", date: "2022/09/03"},
	{name: "Quiz night", description: "Quiz night at the local pub", date: "2022/11/05"},
	{name: "Fundraiser marathon", description: "Raising money for a very good cause!", date: "2022/10/15"},
	{name: "Date night", description: "Date night at a fancy restaurant", date: "2022/10/26"},
	{name: "Hike", description: "A hike on the otter trail", date: "2022/10/26"},
];

class Index extends React.Component {
	render() {
		return (
			<div className="container my-5">
				<EventList theDate={"2022/09/03"} events={events} />
			</div>
		);
	}
}

createRoot(document.getElementById('root')).render(<Index />);

