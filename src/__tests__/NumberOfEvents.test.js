import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import { extractLocations, getEvents } from '../api';

describe('<NumberOfEvents /> component', () => {
	let numberOfEventsComponent;
	let numberTextBox;
	beforeEach(() => {
		numberOfEventsComponent = render(<NumberOfEvents />);
		numberTextBox = numberOfEventsComponent.queryByRole('textbox');
	});
	test('III.1.c.i: check that number of events input box is rendered', () => {
		expect(numberTextBox).toBeInTheDocument();
	});
	test('III.1.c.ii: has a default value of 32', () => {
		expect(numberTextBox).toHaveValue('32');
	});
	test('III.2.c.i: Check if the default value for the number of events entered is updated when the user updates it', async () => {
		const user = userEvent.setup();
		await user.type(numberTextBox, '{backspace}{backspace}10');
		expect(numberTextBox).toHaveValue('10');
	});
});
