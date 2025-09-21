import React, { useState } from "react";
import { CustomCardProps } from "../../types";
import CustomButton from "./CustomButton";

const CustomCard = ({
	item,
	onRemove,
	onEdit,
	isSelected = false,
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

	// Compact view when not selected
	if (!isSelected) {
		return (
			<div className="h-8 bg-blue-500 rounded-sm shadow-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-md flex items-center justify-center cursor-pointer">
				<span className="text-white text-xs font-medium truncate px-2">
					{item.name}
				</span>
			</div>
		);
	}

	// Expanded view when selected
	return (
		<div className="relative p-4 bg-white rounded-lg shadow-lg border-2 border-blue-400 transition-all duration-300 font-sans">
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
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation(); // Prevent triggering the parent click
								setEditing(true);
							}}
							title="Click to edit">
							{item.name}
						</span>
					)}
					{showTooltip && !editing && (
						<div
							role="tooltip"
							className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-100 z-50">
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
						onClick={(e?: React.MouseEvent) => {
							e?.stopPropagation(); // Prevent triggering the parent click
							onRemove(item.id);
						}}
						className="bg-red-200 hover:bg-red-300 text-red-700 focus:ring-red-100 px-2 py-1 rounded-full text-xs w-7 h-7 min-w-0 min-h-0 flex items-center justify-center transition-colors"
					/>
				)}
			</div>
			<div className="mt-2">
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
export default CustomCard;
