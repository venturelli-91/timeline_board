import React from "react";
import { ItemTooltipProps } from "../../../types";

const ItemTooltip = ({ text, isVisible }: ItemTooltipProps) => {
	if (!isVisible) return null;

	return (
		<div
			role="tooltip"
			className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-100 z-50">
			{text}
			<div
				className="tooltip-arrow"
				data-popper-arrow></div>
		</div>
	);
};

export default ItemTooltip;
