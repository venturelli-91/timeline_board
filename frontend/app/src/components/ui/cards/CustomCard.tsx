import React, { useState } from "react";
import { CustomCardProps } from "../../../types";
import CustomButton from "../buttons/CustomButton";

const CustomCard = ({
	item,
	onRemove,
	onEdit,
}: CustomCardProps & {
	onRemove?: (id: number) => void;
	onEdit?: (id: number, name: string) => void;
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editValue, setEditValue] = useState(item.name);

	const handleSave = () => {
		if (onEdit && editValue.trim()) {
			onEdit(item.id, editValue.trim());
			setEditing(false);
		}
	};

	return (
		<div className="relative p-4 bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl hover:bg-[#47cff828] hover:scale-105 transform font-sans">
			<div className="flex justify-between items-start">
				<div className="font-semibold text-lg inline-block relative">
					{editing ? (
						<div className="flex items-center gap-2">
							<input
								className="border border-gray-300 rounded px-2 py-1 text-sm"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								autoFocus
								onKeyDown={(e) => {
									if (e.key === "Enter") handleSave();
									if (e.key === "Escape") setEditing(false);
								}}
								placeholder="Edit name"
								title="Edit item name"
							/>
							<CustomButton
								name="Save"
								onClick={handleSave}
								className="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-xs rounded"
							/>
							<CustomButton
								name="Cancel"
								onClick={() => {
									setEditing(false);
									setEditValue(item.name);
								}}
								className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1 text-xs rounded"
							/>
						</div>
					) : (
						<span
							className="cursor-pointer"
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
							onClick={() => setEditing(true)}
							title="Click to edit">
							{item.name}
						</span>
					)}
					{showTooltip && !editing && (
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
				{onRemove && (
					<CustomButton
						name="✕"
						onClick={() => onRemove(item.id)}
						className="bg-red-200 hover:bg-red-300 text-red-700 focus:ring-red-100 px-2 py-1 rounded-full text-xs w-7 h-7 min-w-0 min-h-0 flex items-center justify-center transition-colors"
					/>
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
