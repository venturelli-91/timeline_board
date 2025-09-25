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
			className="w-full h-screen max-h-screen bg-gradient-to-b from-white to-gray-50 font-sans overflow-hidden"
			onClick={handleClickOutside}>
			<div className="w-full h-full flex flex-col p-4">{children}</div>
		</div>
	);
};

export default BoardWrapper;
