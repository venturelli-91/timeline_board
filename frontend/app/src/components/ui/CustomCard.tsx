import React, { useState } from "react";

interface CustomCardProps {
	title?: string;
	date?: string;
}

const CustomCard = ({ title, date }: CustomCardProps) => {
	const [showTooltip, setShowTooltip] = useState(false);
	return (
		<div className="relative p-4 bg-white rounded-lg shadow-md">
			<div
				className="font-semibold text-lg cursor-pointer inline-block relative"
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}>
				{title}
				{showTooltip && (
					<div
						role="tooltip"
						className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-100">
						{title}
						<div
							className="tooltip-arrow"
							data-popper-arrow></div>
					</div>
				)}
			</div>
			<div>{date}</div>
		</div>
	);
};
export default CustomCard;
