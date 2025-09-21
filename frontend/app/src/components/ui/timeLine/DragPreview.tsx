import React from "react";
import { useDragStore } from "../../../store/dragStore";

const DragPreview: React.FC = () => {
	const { isDragging, draggedItem, previewPosition } = useDragStore();

	if (!isDragging || !draggedItem || !previewPosition) {
		return null;
	}

	return (
		<div
			className="absolute z-30 pointer-events-none opacity-75"
			style={{
				left: `${previewPosition.left}px`,
				top: `${20 + previewPosition.lane * 80}px`,
				width: "120px", // Minimum width for preview
			}}>
			<div className="h-8 bg-blue-400 rounded-sm shadow-lg border-2 border-blue-600 flex items-center justify-center">
				<span className="text-white text-xs font-medium truncate px-2">
					{draggedItem.name}
				</span>
			</div>
		</div>
	);
};

export default DragPreview;
