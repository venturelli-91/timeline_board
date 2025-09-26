import React from "react";
import { TimelineControlsProps } from "../../../types/components/timeline";

const TimelineControls: React.FC<TimelineControlsProps> = ({
	itemCount,
	totalDays,
}) => {
	return (
		<div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 flex justify-between items-center">
			<div className="flex items-center gap-4 text-sm font-medium text-gray-700">
				<div className="flex items-center gap-1">
					<span className="w-2 h-2 bg-green-500 rounded-full"></span>
					{itemCount} tasks
				</div>
				<div className="flex items-center gap-1">
					<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
					{totalDays} days
				</div>
			</div>
			<div className="text-xs text-gray-500 flex items-center gap-1">
				<svg
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M7 16l-4-4m0 0l4-4m-4 4h18"
					/>
				</svg>
				Scroll horizontally to navigate
			</div>
		</div>
	);
};

export default TimelineControls;
