// src/components/EventGenresChart.js

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
	const [data, setData] = useState([]);

	const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

	const colors = ['#EA4747', '#22CE22', '#127DDD', '#FFFF00', '#DB61DB'];

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
		return data;
	};

	const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
		const RADIAN = Math.PI / 180;
		const radius = outerRadius;
		const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
		const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

		const labelColor = colors[index];

		return percent ? (
			<text
				x={x}
				y={y}
				fill={labelColor}
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
				height={400}
				margin={{
					top: 20,
					right: 60,
					bottom: 80,
					left: 90,
				}}>
				<Pie
					data={data}
					dataKey='value'
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={130}

					// fill='#8884d8'
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={colors[index]}
						/>
					))}
				</Pie>
				<Legend
					verticalAlign='bottom'
					height={1}
					align='center'
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenresChart;
