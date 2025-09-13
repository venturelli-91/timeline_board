import React, { useState } from "react";
import { TimelineItem } from "../../data/timelineItems";

interface CustomCardProps {
	item: TimelineItem;
}

const CustomCard = ({ item }: CustomCardProps) => {
	const [showTooltip, setShowTooltip] = useState(false);
	return (
		<div className="relative p-4 bg-white rounded-lg shadow-md">
			<div
				className="font-semibold text-lg cursor-pointer inline-block relative"
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}>
				{item.name}
				{showTooltip && (
					<div
						role="tooltip"
						className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-100">
						{item.name}
						<div
							className="tooltip-arrow"
							data-popper-arrow></div>
					</div>
				)}
			</div>
			<div>
				<span className="text-xs text-gray-500">
					{item.start} - {item.end}
				</span>
			</div>
		</div>
	);
};
export default CustomCard;
