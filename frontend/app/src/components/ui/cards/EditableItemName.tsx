import React, { useState } from "react";
import { useEditTooltipStore } from "../../../store/editTooltipStore";
import ItemTooltip from "./ItemTooltip";

interface EditableItemNameWithTooltipProps {
	initialName: string;
	showTooltip?: boolean;
	itemId: number;
}

const EditableItemName = ({
	initialName,
	showTooltip = false,
	itemId,
}: EditableItemNameWithTooltipProps) => {
	const [showNameTooltip, setShowNameTooltip] = useState(false);
	const { showEditTooltip } = useEditTooltipStore();

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		const rect = e.currentTarget.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top;
		showEditTooltip(itemId, initialName, x, y);
	};

	return (
		<div className="relative">
			<span
				className="cursor-pointer hover:text-blue-600 transition-colors"
				onMouseEnter={() => setShowNameTooltip(true)}
				onMouseLeave={() => setShowNameTooltip(false)}
				onClick={handleClick}
				title="Click to edit">
				{initialName}
			</span>
			<ItemTooltip
				text={initialName}
				isVisible={showTooltip && showNameTooltip}
			/>
		</div>
	);
};

export default EditableItemName;
