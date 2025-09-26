import React from "react";
import { TimelineGridProps } from "../../../types/components/timeline";

const TimelineGrid: React.FC<TimelineGridProps> = ({ totalDays, dayWidth }) => {
	const weekCount = Math.ceil(totalDays / 7);

	return (
		<div className="absolute inset-0 pointer-events-none">
			{/* Weekly grid lines */}
			{Array.from({ length: weekCount }).map((_, weekIndex) => (
				<div
					key={`week-${weekIndex}`}
					className="absolute top-0 bottom-0 border-l border-gray-200"
					style={{ left: `${weekIndex * 7 * dayWidth}px` }}
				/>
			))}

			{/* Monthly grid lines (every 4 weeks) */}
			{Array.from({ length: Math.ceil(weekCount / 4) }).map((_, monthIndex) => (
				<div
					key={`month-${monthIndex}`}
					className="absolute top-0 bottom-0 border-l-2 border-blue-200"
					style={{ left: `${monthIndex * 28 * dayWidth}px` }}
				/>
			))}
		</div>
	);
};
export default TimelineGrid;
