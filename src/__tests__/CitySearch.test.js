import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
	let CitySearchComponent;
	let cityTextBox;
	beforeEach(() => {
		CitySearchComponent = render(<CitySearch allLocations={[]} />);
		cityTextBox = CitySearchComponent.queryByRole('textbox');
	});
	test('I.2.c.i: renders text input', () => {
		expect(cityTextBox).toBeInTheDocument();
		expect(cityTextBox).toHaveClass('city');
	});
	test('I.2.c.ii: suggestions list is hidden by default', () => {
		const suggestionList = CitySearchComponent.queryByRole('list');
		expect(suggestionList).not.toBeInTheDocument();
	});

	test('I.2.c.iii: renders a list of suggestions when city textbox gains focus', async () => {
		const user = userEvent.setup();
		await user.click(cityTextBox);
		const suggestionList = CitySearchComponent.queryByRole('list');
		expect(suggestionList).toBeInTheDocument();
		expect(suggestionList).toHaveClass('suggestions');
	});
	test('I.2.c.iv: updates list of suggestions correctly when user types in city textbox', async () => {
		const user = userEvent.setup();
		const allEvents = await getEvents();
		const allLocations = extractLocations(allEvents);
		CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

		// user types "Berlin" in city textbox
		// const cityTextBox = CitySearchComponent.queryByRole('textbox');
		await user.type(cityTextBox, 'Berlin');

		// filter allLocations to locations matching "Berlin"
		const suggestions = allLocations
			? allLocations.filter((location) => {
					return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
			  })
			: [];

		// get all <li> elements inside the suggestion list
		const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
		expect(suggestionListItems).toHaveLength(suggestions.length + 1);
		for (let i = 0; i < suggestions.length; i += 1) {
			expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
		}
	});
	test('I.3.c.i: renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
		const user = userEvent.setup();
		const allEvents = await getEvents();
		const allLocations = extractLocations(allEvents);
		CitySearchComponent.rerender(
			<CitySearch
				allLocations={allLocations}
				setCurrentCity={() => {}}
			/>
		);

		// const cityTextBox = CitySearchComponent.queryByRole('textbox');
		await user.type(cityTextBox, 'Berlin');

		// the suggestion's textContent look like this: "Berlin, Germany"
		const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

		await user.click(BerlinGermanySuggestion);

		expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
	});
});

// ********************   Integration Testing   ******************************

// This test assumes everything will work once the App component is
// rendered (from the user’s point of view,
// you could say, when “the app is opened”) and the user clicks
// on the city text box. The correct suggestions list will appear
// (the expected number should be the count of all suggested locations,
// plus one for the hardcoded “See all cities” suggested item).

describe('<CitySearch /> integration', () => {
	test('I.3.c.ii: renders suggestions list when the app is rendered.', async () => {
		const user = userEvent.setup();
		const AppComponent = render(<App />);
		const AppDOM = AppComponent.container.firstChild;

		const CitySearchDOM = AppDOM.querySelector('#city-search');
		const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
		await user.click(cityTextBox);

		const allEvents = await getEvents();
		const allLocations = extractLocations(allEvents);

		const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
		expect(suggestionListItems.length).toBe(allLocations.length + 1);
	});
});
