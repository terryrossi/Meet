import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react';
import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/alert';

function App() {
	// State Variables
	const [isLoading, setIsLoading] = useState(true);

	const [events, setEvents] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32); // initialized at 32 based on requirements
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState('See all cities');
	const [infoAlert, setInfoAlert] = useState('');
	const [errorAlert, setErrorAlert] = useState('');
	const [warningAlert, setWarningAlert] = useState('');

	// Fetch Google API for Calendar Events
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true); // Set loading to true before fetching events
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
			setIsLoading(false); // Set loading to false after events are fetched
		};

		if (navigator.onLine) {
			setWarningAlert('');
		} else {
			setWarningAlert(
				'Lost Internet Connection! The list of Events can NOT be refreshed until the internet connection is restored.'
			);
		}
		fetchData();
	}, [currentCity, currentNOE]);

	return (
		<div className='App'>
			<h1 className='google-logo'>
				Google <span> Calendar </span> Events
			</h1>
			<div className='alerts-container'>
				{errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
			</div>
			<div>{warningAlert.length ? <WarningAlert text={warningAlert} /> : null}</div>
			<div>{infoAlert.length ? <InfoAlert text={infoAlert} /> : <hr></hr>}</div>
			<CitySearch
				allLocations={allLocations}
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>
			<NumberOfEvents
				setCurrentNOE={setCurrentNOE}
				setErrorAlert={setErrorAlert}
			/>
			{isLoading ? (
				<Button
					variant='primary'
					disabled>
					<Spinner
						as='span'
						animation='border'
						size='sm'
						role='status'
						aria-hidden='true'
					/>
					<span> Loading...</span>
				</Button>
			) : (
				<>
					<div className='charts-container'>
						<EventGenresChart events={events} />
						<CityEventsChart
							allLocations={allLocations}
							events={events}
						/>
					</div>
					<EventList events={events} />
				</>
			)}
		</div>
	);
}

export default App;
