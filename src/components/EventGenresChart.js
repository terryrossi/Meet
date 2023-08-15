// src/components/EventGenresChart.js

import { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
	const [data, setData] = useState([]);

	const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

	useEffect(() => {
		setData(getData());
	}, [`${events}`]);

	const getData = () => {
		const data = genres.map((genre) => {
			const filteredEvents = events.filter((event) => event.summary.includes(genre));
			const name = genre;
			const value = filteredEvents.length;
			return { name, value };
		});
		console.log(data);
		return data;
	};

	const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
		const RADIAN = Math.PI / 180;
		const radius = outerRadius;
		const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
		const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
		return percent ? (
			<text
				x={x}
				y={y}
				fill='#8884d8'
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline='central'>
				{`${genres[index]} ${(percent * 100).toFixed(0)}%`}
			</text>
		) : null;
	};

	return (
		<ResponsiveContainer
			width='99%'
			height={400}>
			<PieChart
				width={400}
				height={400}>
				<Pie
					data={data}
					dataKey='value'
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={130}
					fill='#8884d8'
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenresChart;
