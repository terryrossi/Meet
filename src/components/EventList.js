import Event from './Event';
import { Row, Col } from 'react-bootstrap';

const EventList = ({ events }) => {
	return (
		// <Row style={{ marginTop: '10px' }}>
		<ul id='event-list'>
			{events
				? events.map((event) => (
						// <Col
						// 	md={3}
						// 	sm={6}
						// 	xs={12}>
						<Event
							key={event.id}
							event={event}
						/>
						// </Col>
				  ))
				: null}
		</ul>
		// </Row>
	);
};

export default EventList;
