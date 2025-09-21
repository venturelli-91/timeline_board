import React from "react";
import { BoardWrapperProps } from "../../types/index";
import { useEditTooltipStore } from "../../store/editTooltipStore";
import { useTooltipStore } from "../../store/tooltipStore";

const BoardWrapper = ({ children }: BoardWrapperProps) => {
	const { hideEditTooltip } = useEditTooltipStore();
	const { hideTooltip } = useTooltipStore();

	const handleClickOutside = (e: React.MouseEvent) => {
		// Only close tooltips if clicking directly on the wrapper (not on children)
		if (e.target === e.currentTarget) {
			hideEditTooltip();
			hideTooltip();
		}
	};

	return (
		<div
			className="max-w-5xl mx-auto my-8 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 font-sans"
			onClick={handleClickOutside}>
			{children}
		</div>
	);
};

export default BoardWrapper;
