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
			className="w-full min-h-screen px-6 py-6 bg-gradient-to-b from-white to-gray-50 font-sans overflow-visible"
			onClick={handleClickOutside}>
			<div className="w-full h-full flex flex-col gap-6">{children}</div>
		</div>
	);
};

export default BoardWrapper;
