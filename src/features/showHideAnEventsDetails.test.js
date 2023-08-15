import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
	test('An event element is collapsed by default.', ({ given, when, then }) => {
		let AppComponent;
		let AppDOM;
		let EventListDOM;
		given('a list of events', () => {
			// Rendering the App
			AppComponent = render(<App />);
			AppDOM = AppComponent.container.firstChild;
		});

		// Nothing needs to be done here
		when('user doesn’t click', () => {});

		// Wait for events to be rendered then Look for the Hide Details Button
		// The Button should not be present if none of the Show Details cards are opened
		then('all the events should show in collapsed mode', async () => {
			await waitFor(() => {
				EventListDOM = AppDOM.querySelector('#event-list');
				const hideDetailsButton = within(EventListDOM).queryByText('Hide Details');
				expect(hideDetailsButton).not.toBeInTheDocument();
			});
		});
	});

	test('User can expand an event to see details.', ({ given, when, then }) => {
		let AppComponent;
		let AppDOM;
		let EventListDOM;
		let showDetailsButtonList;

		given('a list of events in collapsed mode', async () => {
			// Render the App and create the variables for Dom Elements
			AppComponent = render(<App />);
			AppDOM = AppComponent.container.firstChild;

			// Wait for events to be listed and create a list of Show Details button elements
			// Check to see if there is at least 1 button present
			await waitFor(() => {
				EventListDOM = AppDOM.querySelector('#event-list');
				showDetailsButtonList = within(EventListDOM).queryAllByText('Show Details');
				expect(showDetailsButtonList[0]).toBeInTheDocument();
			});
		});

		when('user clicks on show details button', async () => {
			// Click on the first show details button
			const user = userEvent.setup();
			await user.click(showDetailsButtonList[0]);
		});

		then('expand the event to see the details', async () => {
			// Re-load event-list
			EventListDOM = AppDOM.querySelector('#event-list');

			// Wait for events to be listed and create a list of Hide Details button elements
			// Check to see if there is at least 1 button present
			await waitFor(() => {
				const hideDetailsButtonList = within(EventListDOM).queryAllByText('Hide Details');
				expect(hideDetailsButtonList.length).toBeGreaterThan(0);
			});
		});
	});

	test('User can collapse an event to hide details.', ({ given, when, then }) => {
		let AppComponent;
		let AppDOM;
		let EventListDOM;
		let showDetailsButtonList;
		let hideDetailsButton;

		given('a detailed view of an event', async () => {
			// Prep App to show Event Detailed View
			const user = userEvent.setup();
			// Render the App
			AppComponent = render(<App />);

			// Create Dom element variables
			AppDOM = AppComponent.container.firstChild;
			// EventListDOM = AppDOM.querySelector('#event-list');

			// Build a list of "Show Details" Buttons (Wait for getEvents to fetch events)
			await waitFor(() => {
				EventListDOM = AppDOM.querySelector('#event-list');
				showDetailsButtonList = within(EventListDOM).queryAllByText('Show Details');
				expect(showDetailsButtonList[0]).toBeInTheDocument();
			});

			// Click on the first button
			await user.click(showDetailsButtonList[0]);

			// Now that the Detailled view is opened, there should be a "Hide Details" button
			await waitFor(() => {
				// Declare Hide Details Button
				hideDetailsButton = within(EventListDOM).queryByText('Hide Details');
				// Check to make sure Button is present in the Dom
				expect(hideDetailsButton).toBeInTheDocument;
			});
		});

		when('the user clicks on the hide details button', async () => {
			const user = userEvent.setup();

			// Click on "Hide Details" Button
			await user.click(hideDetailsButton);
		});

		then('the detailed view is collapsed', async () => {
			// Re-created event-list
			EventListDOM = AppDOM.querySelector('#event-list');

			// Create a list of "Hide Details" buttons and make sure there's only 1
			await waitFor(() => {
				const hideDetailsButtonList = within(EventListDOM).queryAllByText('Hide Details');
				expect(hideDetailsButtonList.length).toEqual(0);
			});
		});
	});
});
