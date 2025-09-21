import React from "react";
import { TimeAxisProps } from "../../types";

const TimeAxis: React.FC<TimeAxisProps> = ({ startDate, endDate, width }) => {
	const generateTimeMarkers = () => {
		const markers = [];
		const totalDays = Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
		);
		const markerInterval = Math.max(1, Math.floor(totalDays / 10)); // Show ~10 markers

		for (let i = 0; i <= totalDays; i += markerInterval) {
			const currentDate = new Date(startDate);
			currentDate.setDate(startDate.getDate() + i);

			const position = (i / totalDays) * width;

			markers.push({
				date: currentDate,
				position,
				isWeekStart: currentDate.getDay() === 1, // Monday
				isMonthStart: currentDate.getDate() === 1,
			});
		}

		return markers;
	};

	const timeMarkers = generateTimeMarkers();

	return (
		<div className="relative w-full h-20 bg-gradient-to-b from-gray-50 to-gray-100 border-b-2 border-gray-300 shadow-sm">
			{/* Background grid lines */}
			<div className="absolute inset-0">
				{timeMarkers.map((marker, index) => (
					<div
						key={index}
						className={`absolute top-0 bottom-0 transition-colors ${
							marker.isMonthStart
								? "border-l-2 border-blue-600 shadow-sm"
								: marker.isWeekStart
								? "border-l border-gray-500"
								: "border-l border-gray-300"
						}`}
						style={{ left: marker.position }}
					/>
				))}
			</div>

			{/* Date labels */}
			<div className="absolute inset-0 flex items-center pt-2">
				{timeMarkers.map((marker, index) => (
					<div
						key={index}
						className="absolute transform -translate-x-1/2"
						style={{ left: marker.position }}>
						<div
							className={`text-xs font-medium px-2 py-1 rounded ${
								marker.isMonthStart
									? "text-blue-700 font-bold bg-blue-50 border border-blue-200"
									: "text-gray-700 bg-white border border-gray-200 shadow-sm"
							}`}>
							{marker.isMonthStart
								? marker.date.toLocaleDateString("en-US", {
										month: "short",
										year: "numeric",
								  })
								: marker.date.toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
								  })}
						</div>
					</div>
				))}
			</div>

			{/* Today indicator */}
			{(() => {
				const today = new Date();
				if (today >= startDate && today <= endDate) {
					const todayPosition =
						((today.getTime() - startDate.getTime()) /
							(endDate.getTime() - startDate.getTime())) *
						width;

					return (
						<div
							className="absolute top-0 bottom-0 border-l-2 border-red-500 z-10 shadow-lg"
							style={{ left: todayPosition }}>
							<div className="absolute -top-3 left-0 transform -translate-x-1/2">
								<div className="bg-red-500 text-white text-xs px-2 py-1 rounded-md text-center whitespace-nowrap shadow-md font-semibold">
									TODAY
								</div>
								<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
							</div>
						</div>
					);
				}
				return null;
			})()}
		</div>
	);
};

export default TimeAxis;
