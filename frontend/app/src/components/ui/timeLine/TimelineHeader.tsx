import React from "react";
import { TimelineHeaderProps } from "../../../types";

const TimelineHeader: React.FC<TimelineHeaderProps> = ({
	title = "Timeline View",
}) => {
	return (
		<div className="sticky top-0 z-20 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-200">
			<div className="px-6 py-4">
				<h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
					<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
					{title}
				</h3>
			</div>
		</div>
	);
};

export default TimelineHeader;
