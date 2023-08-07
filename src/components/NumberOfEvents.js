import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
	const [number, setNumber] = useState(32);

	// Changes made by user are copied into State variables which came as prop from App Component
	// This value will be used to set the max number of events to show on the page.
	const handleInputChanged = (event) => {
		const value = event.target.value;
		setNumber(value);
		setCurrentNOE(value);
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
