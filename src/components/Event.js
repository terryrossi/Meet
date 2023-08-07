import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Event = ({ event }) => {
	const [showDetails, setShowDetails] = useState(false);

	const toggleDetails = () => {
		setShowDetails((prevShowDetails) => !prevShowDetails);
	};

	return (
		<>
			<li key={event.id}>
				<Card
					style={{
						boxShadow: '1px 1px 10px 0px rgb(41, 39, 39)',
						borderRadius: '9px',
						padding: '15px',
						margin: '10px',
					}}>
					<Card.Body>
						<Card.Title>{event.summary}</Card.Title>
						<Card.Text>{event.location}</Card.Text>
						{!showDetails && (
							<Button
								variant='primary'
								onClick={toggleDetails}>
								Show Details
							</Button>
						)}
						{showDetails && (
							<>
								<p>Description: {event.description}</p>
								<p>
									Start Time: {event.start.dateTime} Time Zone: {event.start.timeZone}
								</p>
								<Button
									variant='primary'
									onClick={toggleDetails}>
									Hide Details
								</Button>
							</>
						)}
					</Card.Body>
				</Card>
			</li>
		</>
	);
};

export default Event;
