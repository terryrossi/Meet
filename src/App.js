import { useEffect, useState } from 'react';
import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';

function App() {
	// State Variables
	const [events, setEvents] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32); // initialized at 32 based on requirements
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState('See all cities');

	// Fetch Google API for Calendar Events
	useEffect(() => {
		const fetchData = async () => {
			const allEvents = await getEvents();
			// If 'See all cities' is selected => Show all cities in textbox. Else based on currentCity (selected in CitySearch Component)
			const filteredEvents =
				currentCity === 'See all cities'
					? allEvents
					: allEvents.filter((event) => event.location === currentCity);

			// List of Events is sliced based on max number of event box in NumberOfEvents Component
			setEvents(filteredEvents.slice(0, currentNOE));
			// extract the city from the locations property of all events
			setAllLocations(extractLocations(allEvents));
		};

		fetchData();
	}, [currentCity, currentNOE]);

	return (
		<div className='App'>
			<CitySearch
				allLocations={allLocations}
				setCurrentCity={setCurrentCity}
			/>
			<NumberOfEvents setCurrentNOE={setCurrentNOE} />
			<EventList events={events} />
		</div>
	);
}

export default App;
