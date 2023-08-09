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
		// Nothing to de here
		given(/^a default of (\d+) in the input field for the number of events$/, async (arg0) => {});

		let AppComponent;
		when('user does not modify this number', () => {
			// Initial rendering
			AppComponent = render(<App />);
		});

		// Check if the number of Events listed is 32
		then(/^the list of events is filtered to (\d+) maximum events$/, async (arg0) => {
			//
			const AppDOM = AppComponent.container.firstChild;
			const EventListDOM = AppDOM.querySelector('#event-list');

			await waitFor(() => {
				// Create a list of items which should be 32 (default)
				const EventListItems = within(EventListDOM).queryAllByRole('listitem');
				expect(EventListItems.length).toBe(32);
			});
		});
	});

	test('User can change the number of events displayed.', ({ given, when, then }) => {
		given(/^a default of (\d+) in the input field for the number of events$/, async (arg0) => {});

		// Init all DOM Elements
		let AppComponent;
		let AppDOM;
		let NumberOfEventsDOM;
		let NOETextBox;

		when('the user modifies this number', async () => {
			const user = userEvent.setup();
			// Initial rendering
			AppComponent = render(<App />);
			AppDOM = AppComponent.container.firstChild;

			// DOM element for the textbox parent
			NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');

			// textbox element
			NOETextBox = within(NumberOfEventsDOM).queryByRole('textbox');

			//  erase number 32 to replace with 10
			await user.type(NOETextBox, '{backspace}{backspace}10');
		});

		then(
			'the list of events is filtered to a new number of events based on the entered number',
			async () => {
				// NO RERENDERING
				AppDOM = AppComponent.container.firstChild;
				const EventListDOM = AppDOM.querySelector('#event-list');
				await waitFor(() => {
					// New list should be equal to 10
					const EventListItems = within(EventListDOM).queryAllByRole('listitem');
					expect(EventListItems.length).toBe(10);
				});
			}
		);
	});
});
