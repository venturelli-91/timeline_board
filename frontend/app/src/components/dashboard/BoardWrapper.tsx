import React from "react";
import { BoardWrapperProps } from "../../types/components/ui";
import { useEditTooltipStore } from "../../store/editTooltipStore";
import { useTooltipStore } from "../../store/tooltipStore";

const BoardWrapper = ({ children }: BoardWrapperProps) => {
	const { hideEditTooltip } = useEditTooltipStore();
	const { hideTooltip } = useTooltipStore();

	const handleClickOutside = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			hideEditTooltip();
			hideTooltip();
		}
	};

	return (
		<div
			className="max-w-5xl mx-auto my-8 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 font-sans overflow-visible"
			onClick={handleClickOutside}>
			{children}
		</div>
	);
};

export default BoardWrapper;
