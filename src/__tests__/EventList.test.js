import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

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
