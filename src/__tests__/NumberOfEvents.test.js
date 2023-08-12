import { waitFor, within, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

// ************* Unit Testing *******************

describe('<NumberOfEvents /> component', () => {
	let numberOfEventsComponent;
	let numberTextBox;
	let setCurrentNOE;

	beforeEach(() => {
		// This function is used to avoid a problem running the unit test when rendering NumberOfEvents without the proper State variable
		// That state variable is not available here so a dummy function will be used.
		setCurrentNOE = jest.fn();
		numberOfEventsComponent = render(
			<NumberOfEvents
				setCurrentNOE={setCurrentNOE}
				setErrorAlert={() => {}}
			/>
		);

		// Init DOM Element
		numberTextBox = numberOfEventsComponent.queryByRole('textbox');
	});

	// There's a reference to all the test description in the word document associated with the Project (MeepApp.doc)
	test('III.1.c.i: check that number of events input box is rendered', () => {
		expect(numberTextBox).toBeInTheDocument();
	});

	// Default of 32 per user requirements
	test('III.1.c.ii: has a default value of 32', () => {
		expect(numberTextBox).toHaveValue('32');
	});

	test('III.2.c.i: Check if the default value for the number of events entered is updated when the user updates it', async () => {
		const user = userEvent.setup();

		// Simulate user backspacing twice and entering 10
		await user.type(numberTextBox, '{backspace}{backspace}10');

		expect(numberTextBox).toHaveValue('10');
	});
});

// ************* Integration Testing *******************

describe('<NumberOfEvents /> integration', () => {
	let AppComponent;
	let AppDOM;
	let NumberOfEventsDOM;
	let NOETextBox;

	beforeEach(() => {
		// DOM Elements init
		AppComponent = render(<App />);
		AppDOM = AppComponent.container.firstChild;

		NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
		NOETextBox = within(NumberOfEventsDOM).queryByRole('textbox');
	});

	test('Added for test: Check if the default value for the number of events entered is updated when the user updates it (from 32 to 3)', async () => {
		const user = userEvent.setup();

		// User backspace twice and enter 3
		await user.type(NOETextBox, '{backspace}{backspace}3');

		expect(NOETextBox).toHaveValue('3');
	});

	test('III.2.c.ii: Check if the number of events shown match the max number entered by the user', async () => {
		const user = userEvent.setup();
		const EventListDOM = AppDOM.querySelector('#event-list');

		await user.type(NOETextBox, '{backspace}{backspace}3');

		await waitFor(() => {
			const EventListItems = within(EventListDOM).queryAllByRole('listitem');
			expect(EventListItems.length).toBe(3);
		});
	});
});
