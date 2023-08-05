import { useState } from 'react';

const NumberOfEvents = () => {
	const [number, setNumber] = useState(32);

	const handleInputChanged = (event) => {
		const value = event.target.value;

		setNumber(value);
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
