import { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
	// State Variables
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	// use the stringified value of the allLocation prop as a dependency.
	// This way, if there’s a change in it (e.g.,
	// an empty array that gets filled), the useEffect code will be
	// re-executed again, ensuring that the local suggestions state is updated.
	// This useEffect Sets allLocations as a new state.
	useEffect(() => {
		setSuggestions(allLocations);
	}, [`${allLocations}`]);

	// Function handling the changes made by the user. returns list of events based on user input
	const handleInputChanged = (event) => {
		const value = event.target.value;
		const filteredLocations = allLocations
			? allLocations.filter((location) => {
					return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
			  })
			: [];

		// Sets the value of query to the user input
		setQuery(value);

		// suggestions are now a filtered list of cities based on user input
		setSuggestions(filteredLocations);

		// Prepare error message in case no city found with user input value
		let infoText;
		if (filteredLocations.length === 0) {
			infoText = `No cities found with : ${value}. Please try again`;
		} else {
			infoText = '';
		}
		setInfoAlert(infoText);
	};

	// Sets the value of query to the city clicked on from the textbox
	const handleItemClicked = (event) => {
		const value = event.target.textContent;
		setQuery(value);
		setShowSuggestions(false); // to hide the list
		setCurrentCity(value);
		setInfoAlert('');
	};

	return (
		<div id='city-search'>
			<input
				type='text'
				className='city'
				placeholder='Search for a city'
				value={query}
				onFocus={() => setShowSuggestions(true)}
				onChange={handleInputChanged}
			/>
			{showSuggestions ? (
				<ul className='suggestions'>
					{suggestions.map((suggestion) => {
						return (
							<li
								onClick={handleItemClicked}
								key={suggestion}>
								{suggestion}
							</li>
						);
					})}
					<li
						key='See all cities'
						onClick={handleItemClicked}>
						<b>See all cities</b>
					</li>
				</ul>
			) : null}
		</div>
	);
};

export default CitySearch;
