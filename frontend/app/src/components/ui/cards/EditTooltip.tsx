import React, { useEffect, useState } from "react";
import { useEditTooltipStore } from "../../../store/editTooltipStore";
import { EditTooltipProps } from "../../../types/components/ui";
import CustomButton from "../buttons/CustomButton";

const EditTooltip: React.FC<EditTooltipProps> = ({ onSave }) => {
	const { isVisible, itemId, itemName, position, hideEditTooltip } =
		useEditTooltipStore();
	const [localName, setLocalName] = useState("");

	// Sync local state with store when tooltip becomes visible
	useEffect(() => {
		if (isVisible && itemName) {
			setLocalName(itemName);
		}
	}, [isVisible, itemName]);

	// Close tooltip when pressing ESC
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				hideEditTooltip();
			}
		};

		if (isVisible) {
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}
	}, [isVisible, hideEditTooltip]);

	// Close tooltip when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest(".edit-tooltip")) {
				hideEditTooltip();
			}
		};

		if (isVisible) {
			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [isVisible, hideEditTooltip]);

	const handleSave = () => {
		if (itemId && localName.trim()) {
			// Only call onSave if the name actually changed
			if (localName.trim() !== itemName) {
				onSave(itemId, localName.trim());
			}
			hideEditTooltip();
		}
	};

	const handleCancel = () => {
		setLocalName(itemName);
		hideEditTooltip();
	};

	if (!isVisible || !itemId) {
		return null;
	}

	return (
		<div
			className="edit-tooltip fixed z-[100] bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-64 max-w-sm"
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				transform: "translate(-50%, -100%)",
			}}>
			<div className="mb-3">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Edit Task Name
				</label>
				<input
					type="text"
					value={localName}
					onChange={(e) => setLocalName(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSave();
						if (e.key === "Escape") handleCancel();
					}}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="Enter task name"
					autoFocus
				/>
			</div>

			<div className="flex gap-2 justify-end">
				<CustomButton
					name="Cancel"
					onClick={handleCancel}
					className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 text-sm rounded"
				/>
				<CustomButton
					name="Save"
					onClick={handleSave}
					className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
				/>
			</div>

			{/* Small arrow pointing down */}
			<div
				className="absolute top-full left-1/2 transform -translate-x-1/2"
				style={{
					width: 0,
					height: 0,
					borderLeft: "6px solid transparent",
					borderRight: "6px solid transparent",
					borderTop: "6px solid white",
				}}
			/>
			<div
				className="absolute top-full left-1/2 transform -translate-x-1/2"
				style={{
					width: 0,
					height: 0,
					borderLeft: "5px solid transparent",
					borderRight: "5px solid transparent",
					borderTop: "5px solid #d1d5db",
					marginTop: "-6px",
				}}
			/>
		</div>
	);
};

export default EditTooltip;
