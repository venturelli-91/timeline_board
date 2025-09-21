import React from "react";
import { ExpandedTimelineCardProps } from "../../../types";
import CustomButton from "../buttons/CustomButton";
import EditableItemName from "./EditableItemName";

const ExpandedTimelineCard = ({
	item,
	onRemove,
}: ExpandedTimelineCardProps) => {
	return (
		<div className="relative p-4 bg-white rounded-lg shadow-lg border-2 border-blue-400 transition-all duration-300 font-sans">
			<div className="flex justify-between items-start gap-3">
				<div className="font-semibold text-lg flex-1">
					<EditableItemName
						initialName={item.name}
						showTooltip={true}
						itemId={item.id}
					/>
				</div>
				{onRemove && (
					<div className="flex-shrink-0">
						<CustomButton
							name="✕"
							onClick={() => onRemove(item.id)}
							className="bg-red-200 hover:bg-red-300 text-red-700 focus:ring-red-100 px-2 py-1 rounded-full text-xs w-7 h-7 min-w-0 min-h-0 flex items-center justify-center transition-colors"
						/>
					</div>
				)}
			</div>
			<div className="mt-3">
				<span className="text-sm text-gray-600">
					<strong>Duration:</strong> {item.start} - {item.end}
				</span>
			</div>
			<div className="mt-2 text-xs text-gray-500">
				Click outside to minimize
			</div>
		</div>
	);
};

export default ExpandedTimelineCard;
