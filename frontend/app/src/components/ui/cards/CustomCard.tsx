import React, { useState } from "react";
import { CustomCardProps } from "../../../types";
import { useEditTooltipStore } from "../../../store/editTooltipStore";
import CustomButton from "../buttons/CustomButton";
import ItemTooltip from "./ItemTooltip";

const CustomCard = ({
	item,
	onRemove,
}: CustomCardProps & {
	onRemove?: (id: number) => void;
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const { showEditTooltip } = useEditTooltipStore();

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		const rect = e.currentTarget.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top;
		showEditTooltip(item.id, item.name, x, y);
	};

	return (
		<div className="relative p-4 bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl hover:bg-[#47cff828] hover:scale-105 transform font-sans">
			<div className="flex justify-between items-start">
				<div className="font-semibold text-lg inline-block relative">
					<span
						className="cursor-pointer hover:text-blue-600 transition-colors"
						onMouseEnter={() => setShowTooltip(true)}
						onMouseLeave={() => setShowTooltip(false)}
						onClick={handleClick}
						title="Click to edit">
						{item.name}
					</span>
					<ItemTooltip
						text={item.name}
						isVisible={showTooltip}
					/>
				</div>
				{onRemove && (
					<CustomButton
						name="✕"
						onClick={() => onRemove(item.id)}
						className="bg-red-200 hover:bg-red-300 text-red-700 focus:ring-red-100 px-2 py-1 rounded-full text-xs w-7 h-7 min-w-0 min-h-0 flex items-center justify-center transition-colors"
					/>
				)}
			</div>
			<div className="mt-3">
				<span className="text-sm text-gray-600">
					<strong>Duration:</strong> {item.start} - {item.end}
				</span>
			</div>
		</div>
	);
};

export default CustomCard;
