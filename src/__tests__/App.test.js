// src/__tests__/App.test.js

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
	let AppDOM;
	beforeEach(() => {
		AppDOM = render(<App />).container.firstChild;
	});
	test('I.1.c.i: renders list of events', () => {
		expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
	});
	test('I.1.c.ii: renders CitySearch', () => {
		expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
	});
	test('III.1.c.i: Check that number of events input box is rendered', () => {
		expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
	});
});

// ********************   Integration Testing   ******************************

describe('<App /> integration', () => {
	test('I.3.c.iii: renders a list of events matching the city selected by the user', async () => {
		const user = userEvent.setup();
		const AppComponent = render(<App />);
		const AppDOM = AppComponent.container.firstChild;

		const CitySearchDOM = AppDOM.querySelector('#city-search');
		const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

		await user.type(CitySearchInput, 'Berlin');
		const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
		await user.click(berlinSuggestionItem);

		const EventListDOM = AppDOM.querySelector('#event-list');
		const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

		const allEvents = await getEvents();
		const berlinEvents = allEvents.filter((event) => event.location === 'Berlin, Germany');

		expect(allRenderedEventItems.length).toBe(berlinEvents.length);

		allRenderedEventItems.forEach((event) => {
			expect(event.textContent).toContain('Berlin, Germany');
		});
	});
});
