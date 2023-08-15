import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
	const [number, setNumber] = useState(32);

	// Changes made by user are copied into State variables which came as prop from App Component
	// This value will be used to set the max number of events to show on the page.
	const handleInputChanged = (event) => {
		const value = event.target.value;
		let errorText = '';

		if (isNaN(value)) {
			errorText = `${value} is NOT a number. Please enter a valid number between 1 and 50`;
			setCurrentNOE(32);
		} else if (value <= 0 || value > 50) {
			errorText = `Please enter a number between 1 and 50`;
			setCurrentNOE(32);
		} else {
			setCurrentNOE(value);
		}
		setNumber(value);
		setErrorAlert(errorText);
	};

	return (
		<div id='number-of-events'>
			<input
				type='text'
				className='number'
				placeholder=''
				value={number}
				onChange={handleInputChanged}
			/>
		</div>
	);
};

export default NumberOfEvents;
