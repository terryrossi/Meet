import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { extractLocations, getEvents } from '../api';

describe('<Event /> component', () => {
	let event;
	let EventComponent;

	beforeEach(async () => {
		const allEvents = await getEvents();
		event = allEvents[0];
		EventComponent = render(<Event event={event} />);
	});

	test('II.1.c.i: has an text element of type "summary"', () => {
		// console.log(event);
		expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
	});
	test('II.1.c.ii: has an text element of type "location"', () => {
		expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
	});
	test('II.1.c.iii: has a button element labeled “Show Details”', () => {
		// const allEvents = await getEvents();
		expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
	});

	test("II.1.c.iv: check that by default, event's details section should be hidden", () => {
		const detailsButton = EventComponent.queryByText('Show Details');
		expect(detailsButton).toBeInTheDocument();
	});
	test("II.2.c.i: check that when user clicks the 'show details' button, event's details section should be shown", async () => {
		const user = userEvent.setup();

		const showDetailsButton = EventComponent.queryByText('Show Details');
		await user.click(showDetailsButton);

		const hideDetailsButton = EventComponent.queryByText('Hide Details');
		expect(hideDetailsButton).toBeInTheDocument();
	});
	test("II.2.c.ii: check that when user clicks the 'hide details' button, event's details section should be hidden", async () => {
		const user = userEvent.setup();

		const hideDetailsButton = EventComponent.queryByText('Hide Details');
		await user.click(hideDetailsButton);

		const showDetailsButton = EventComponent.queryByText('Show Details');
		expect(showDetailsButton).toBeInTheDocument();
	});
});
