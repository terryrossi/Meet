import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import App from '../App';
import { getEvents } from '../api';

// ********************   Unit Testing   ******************************

describe('<EventList /> component', () => {
	let EventListComponent;
	beforeEach(() => (EventListComponent = render(<EventList />)));

	test('I.1.c.iii: has an element with "list" role', () => {
		expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
	});
	test('I.1.c.iv: renders predefined number of events', () => {
		EventListComponent.rerender(
			<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
		);
		expect(EventListComponent.getAllByRole('listitem')).toHaveLength(4);
		// Same as...
		// expect(EventListComponent.getAllByRole("listitem").length).toBe(4);
	});
	test('I.1.c.v: renders correct max number of events (32)', async () => {
		const allEvents = await getEvents();
		EventListComponent.rerender(<EventList events={allEvents} />);
		expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
	});
});

// ********************   Integration Testing   ******************************

describe('<EventList /> integration', () => {
	test('I.1.c.vi: renders a list of 32 events when the app is mounted and rendered', async () => {
		const AppComponent = render(<App />);
		const AppDOM = AppComponent.container.firstChild;

		await waitFor(() => {
			const EventListDOM = AppDOM.querySelector('#event-list');
			const EventListItems = within(EventListDOM).queryAllByRole('listitem');
			expect(EventListItems.length).toBe(32);
		});
	});
});
