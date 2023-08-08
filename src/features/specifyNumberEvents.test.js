import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberEvents.feature');

defineFeature(feature, (test) => {
	test('When user hasn’t specified a number, 32 events are shown by default.', ({
		given,
		when,
		then,
	}) => {
		// Init Variables
		let AppComponent;
		let AppDOM;
		let EventListDOM;
		let NumberOfEventsDOM;
		let NumberOfEventsTextBox;
		let EventListItems;

		given(/^a default of (\d+) in the input field for the number of events$/, async (arg0) => {
			// DOM Elements init
			AppComponent = render(<App />);
			AppDOM = AppComponent.container.firstChild;

			NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
			NumberOfEventsTextBox = within(NumberOfEventsDOM).queryByRole('textbox');

			EventListDOM = AppDOM.querySelector('#event-list');

			console.log('eventsListDom ; ', EventListDOM);

			await waitFor(() => {
				// EventListItems = within(EventListDOM).queryAllByRole('listitem');
				EventListItems = within(EventListDOM).queryAllByRole('listitem');
			});
			console.log('List length : ', EventListItems.length);
		});

		// Nothing needs to be done here
		when('user does not modify this number', () => {});

		// Check if the number of Events listed is 32
		then(/^the list of events is filtered to (\d+) maximum events$/, (arg0) => {
			// First make sure the default value is 32
			expect(NumberOfEventsTextBox).toHaveValue('32');

			// Now Create a liste of items that should be equal to 32
			expect(EventListItems.length).toBe(32);
		});
	});

	test('User can change the number of events displayed.', ({ given, when, then }) => {
		// let AppComponent;
		// let AppDOM;
		// let NumberOfEventsDOM;
		// let NOETextBox;
		given(/^a default of (\d+) in the input field for the number of events$/, (arg0) => {});

		when('the user modifies this number', () => {});

		then(
			'the list of events is filtered to a new number of events based on the entered number',
			() => {}
		);
	});
});
