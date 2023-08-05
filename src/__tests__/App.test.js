// src/__tests__/App.test.js

import { render } from '@testing-library/react';
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
